from django.contrib.auth.models import User
from .models import Project
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ['id', 'title', 'client', "description", "context", "estimated_cost" ,'created_at', 'author']
        extra_kwargs = {'author': {'read_only': True}}
    
