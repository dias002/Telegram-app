from django.db import models
from django.contrib.auth.models import User

class Category(models.Model):
    name = models.TextField(max_length=20)
    user = models.ForeignKey(User, on_delete=models.CASCADE,null=True)
    def __str__(self):
        return self.name
    
class Expence(models.Model):
    name = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='expence')
    moneySpent = models.DecimalField(max_digits=10,decimal_places=2)
    title = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE,null=True)
    created_at = models.DateTimeField(auto_now_add=True)

class Income(models.Model):
    name = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='income')
    moneyPlus = models.DecimalField(max_digits=10,decimal_places=2)
    title = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE,null=True)
    created_at = models.DateTimeField(auto_now_add=True)


# Create your models here.
