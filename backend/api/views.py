from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt

from .models import Project, Conversation, Message
from .serializers import ProjectSerializer, UserSerializer, ConversationSerializer, MessageSerializer

from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny

import openai
from dotenv import load_dotenv
import os

load_dotenv()
OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')


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

import logging
from django.utils.decorators import method_decorator

logger = logging.getLogger(__name__)

@method_decorator(csrf_exempt, name='dispatch')
class ChatbotAnswer(generics.RetrieveAPIView):
    def post(self, request, *args, **kwargs):
        user_message = request.data.get('message')
        
        if not user_message:
            return Response({'error': 'No message provided'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            logger.info(f"Received user message: {user_message}")
            completion = openai.chat.completions.create(
                model="gpt-4",
                messages=[
                    {
                        "role": "system",
                        "content": "You are a helpful assistant.",
                    },
                    {   

                        "role": "user",
                        "content": user_message,
                    },
                ],
            )
            response_text = completion.choices[0].message.content
            logger.info(f"OpenAI response: {response_text}")
            return Response({'message': response_text}, status=status.HTTP_200_OK)
        except Exception as e:
            logger.error(f"Error while processing the request: {str(e)}")
            return Response({'error': 'Internal server error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        


class ConversationView(generics.ListCreateAPIView):
    serializer_class = ConversationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Conversation.objects.filter(author=user)
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)



class MessageView(generics.ListCreateAPIView):
    serializer_class = MessageSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Message.objects.filter(author=user)
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)