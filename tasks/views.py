from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend  # type:ignore
from rest_framework.filters import OrderingFilter, SearchFilter
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Task
from .serializers import TaskSerializer

# ---------------------------
# List & Create tasks (user-specific)
# ---------------------------
class TaskListCreateView(generics.ListCreateAPIView):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    filter_backends = [DjangoFilterBackend, OrderingFilter, SearchFilter]
    filterset_fields = ['status', 'priority']      # Filtering
    ordering_fields = ['due_date', 'created_at']  # Ordering
    search_fields = ['title']                      # Searching

    def get_queryset(self):
        # Only return tasks owned by the logged-in user
        return Task.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        # Automatically assign the task owner
        serializer.save(owner=self.request.user)


# ---------------------------
# Retrieve, Update, Delete a single task (user-specific)
# ---------------------------
class TaskDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Ensure only the owner can access their tasks
        return Task.objects.filter(owner=self.request.user)


# ---------------------------
# D3-A: Task Statistics API
# ---------------------------
class TaskStatisticsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        # Count tasks by status
        total_tasks = Task.objects.filter(owner=user).count()
        completed_tasks = Task.objects.filter(owner=user, status='completed').count()
        pending_tasks = Task.objects.filter(owner=user, status='pending').count()
        in_progress_tasks = Task.objects.filter(owner=user, status='in_progress').count()

        # Calculate completion percentage
        completion_percentage = 0
        if total_tasks > 0:
            completion_percentage = round((completed_tasks / total_tasks) * 100, 2)

        data = {
            "total_tasks": total_tasks,
            "completed_tasks": completed_tasks,
            "pending_tasks": pending_tasks,
            "in_progress_tasks": in_progress_tasks,
            "completion_percentage": completion_percentage
        }

        return Response(data)