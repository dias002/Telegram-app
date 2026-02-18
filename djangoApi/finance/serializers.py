from .models import Category, Expence,Income
from rest_framework import serializers


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = Category
        
        
class ExpenceSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = Expence
        
        
class IncomeSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = Income