from django.urls import path
from . import views


urlpatterns = [
    path('projects/', views.ProjectListCreateView.as_view(), name='projects-list'),
    path('projects/get/<int:pk>/', views.GetProjectView.as_view(), name='get-project'),
    path('projects/delete/<int:pk>/', views.ProjectDeleteView.as_view(), name='delete-project'),
    path('chatbot/send_message/', views.ChatbotAnswer.as_view(), name='chatbot'),
    # path('chatbot/vote/', VoteView.as_view(), name='vote'),
    # path('chatbot/comment/', CommentView.as_view(), name='comment'),
]