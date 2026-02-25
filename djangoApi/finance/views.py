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
    serializer_class = ExpenceSerializer
    def get_queryset(self):
        queryset = Expence.objects.filter(user=self.request.user)
        category_id = self.request.query_params.get('category')
        if category_id:
            queryset = queryset.filter(name_id=category_id)
        return queryset
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
        
        
class IncomeViewsets(viewsets.ModelViewSet):
    queryset = Income.objects.all()
    serializer_class = IncomeSerializer
    def get_queryset(self):
        return Income.objects.filter(user=self.request.user)
    def perform_create(self,serializer):
        serializer.save(user=self.request.user)
    
# Create your views here.
