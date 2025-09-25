
from django.contrib.auth.models import User
from rest_framework import viewsets, permissions
from .serializers import AdminUserSerializer

class AdminUserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.filter(is_staff=True)  # Only admin users
    serializer_class = AdminUserSerializer
    permission_classes = [permissions.IsAuthenticated]  # Only logged-in users
