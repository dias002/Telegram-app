from django.db import models
from django.contrib.auth.models import User

class Category(models.Model):
    name = models.CharField(max_length=32)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    def __str__(self):
        return self.name

class Budget(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=32)
    total = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return f"{self.name} ({self.user.username})"

class Transaction(models.Model):
    TRANSACTION_TYPES = (
        ("income", "Доход"),
        ("expense", "Расход"),
    )
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    budget = models.ForeignKey(Budget, on_delete=models.CASCADE, related_name="transactions")
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True)
    type = models.CharField(max_length=7, choices=TRANSACTION_TYPES)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    title = models.CharField(max_length=128)
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return f"{self.get_type_display()}: {self.amount} ({self.title})"

# Create your models here.
