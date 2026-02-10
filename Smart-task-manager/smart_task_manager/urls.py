"""
URL configuration for smart_task_manager project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.http import JsonResponse
from django.urls import path, include
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

# Swagger configuration
schema_view = get_schema_view(
    openapi.Info(
        title="Smart Task Manager API",
        default_version='v1',
        description="API documentation for Smart Task Manager",
        contact=openapi.Contact(email="contact@smarttask.local"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)
from django.shortcuts import render

# Home view to serve the frontend
def home(request):
    return render(request, 'login.html')

def signup(request):
    return render(request, 'signup.html')

def dashboard(request):
    return render(request, 'dashboard.html')

def add_task(request):
    return render(request, 'add-task.html')

urlpatterns = [
    # Frontend Pages
    path('', home),
    path('login.html', home),
    path('signup.html', signup),
    path('dashboard.html', dashboard),
    path('add-task.html', add_task),

    # Admin panel
    path('admin/', admin.site.urls),

    # App APIs
    path('api/users/', include('users.urls')),
    path('api/tasks/', include('tasks.urls')),

    # Swagger URLs
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='redoc'),
]