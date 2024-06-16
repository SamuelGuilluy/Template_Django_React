from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Project
from .serializers import ProjectSerializer

# Create your views here.
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


class ProjectListCreateView(generics.ListCreateAPIView):
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]
    

    def get_queryset(self):
        user = self.request.user
        return Project.objects.filter(author=user)
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            print("serializer is valid")
            serializer.save(author=self.request.user)
        else:
            print("serializer is not valid")
            print(serializer.errors)

# DELETE a project from his id
class ProjectDeleteView(generics.DestroyAPIView):
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Project.objects.filter(author=user)
    

# GET a project from his id 
class GetProjectView(generics.RetrieveAPIView):
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Project.objects.filter(author=user, id=self.kwargs['pk'])
