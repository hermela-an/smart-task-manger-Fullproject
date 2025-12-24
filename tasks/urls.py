from django.urls import path
from .views import (TaskListCreateView, TaskDetailView, TaskStatisticsView,TaskDueDateReminderView )

urlpatterns = [
    path('', TaskListCreateView.as_view(), name='task-list-create'),
    path('<int:pk>/', TaskDetailView.as_view(), name='task-detail'),
    path('statistics/', TaskStatisticsView.as_view(), name='task-statistics'),
    path('reminders/', TaskDueDateReminderView.as_view(), name='task-reminders'),
]