from django.contrib.auth.models import User
from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from rest_framework_simplejwt.tokens import RefreshToken

from .models import Task


class TaskAPITestCase(APITestCase):

    def setUp(self):
        # Create a user
        self.user = User.objects.create_user(
            username="testuser",
            password="testpassword123"
        )

        # Generate JWT token
        refresh = RefreshToken.for_user(self.user)
        self.access_token = str(refresh.access_token)

        # Authenticate requests
        self.client.credentials(
            HTTP_AUTHORIZATION=f"Bearer {self.access_token}"
        )

        # Create a sample task
        self.task = Task.objects.create(
            title="Test Task",
            description="Testing task creation",
            priority="medium",
            status="pending",
            owner=self.user
        )

    def test_create_task(self):
        url = reverse('task-list-create')
        data = {
            "title": "New Task",
            "description": "Created via test",
            "priority": "high",
            "status": "pending"
        }

        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_tasks_list(self):
        url = reverse('task-list-create')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_task(self):
        url = reverse('task-detail', args=[self.task.id])
        data = {"status": "completed"}

        response = self.client.patch(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_task(self):
        url = reverse('task-detail', args=[self.task.id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)