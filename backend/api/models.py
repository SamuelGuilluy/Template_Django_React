from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Project(models.Model):
    title = models.CharField(max_length=1000)
    client = models.TextField()
    # deadline = models.DateTimeField()
    description = models.TextField()
    context = models.TextField()
    estimated_cost = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='projects')

    def __str__(self):
        return self.title

