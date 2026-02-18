from django.shortcuts import render
from .serializers import CategorySerializer,ExpenceSerializer,IncomeSerializer
from rest_framework import viewsets
from .models import Category, Expence,Income


class CategoryViewsets(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    # Возвращает только категории текущего пользователя
    def get_queryset(self):
        return Category.objects.filter(user=self.request.user)
    # При создании автоматически привязываем категорию к текущему пользователю
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    
class ExpenceViewsets(viewsets.ModelViewSet):
    queryset = Expence.objects.all()
    serializer_class = ExpenceSerializer
    
class IncomeViewsets(viewsets.ModelViewSet):
    queryset = Income.objects.all()
    serializer_class = IncomeSerializer
# Create your views here.
