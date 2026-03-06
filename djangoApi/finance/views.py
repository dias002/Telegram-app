
from django.shortcuts import render
from .serializers import CategorySerializer, BudgetSerializer, TransactionSerializer
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models import Sum
from .models import Category, Budget, Transaction

class CategoryViewSet(viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    def get_queryset(self):
        return Category.objects.filter(user=self.request.user)
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)





@api_view(["GET"])
def expense_stats(request):
    budget_id = request.GET.get("budget")

    queryset = Transaction.objects.filter(
        user=request.user,
        type="expense"
    )
    if budget_id:
        queryset = queryset.filter(budget_id=budget_id)

    data = (
        queryset
        .values("category__name")
        .annotate(total=Sum("amount"))
        .order_by("-total")
    )
    return Response(data)



class BudgetViewSet(viewsets.ModelViewSet):
    serializer_class = BudgetSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        return Budget.objects.filter(user=self.request.user)
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class TransactionViewSet(viewsets.ModelViewSet):
    serializer_class = TransactionSerializer
    def get_queryset(self):
        queryset = Transaction.objects.filter(user=self.request.user)
        budget_id = self.request.query_params.get('budget')
        if budget_id:
            queryset = queryset.filter(budget_id=budget_id)
        category_id = self.request.query_params.get('category')
        if category_id:
            queryset = queryset.filter(category_id=category_id)
        tx_type = self.request.query_params.get('type')
        if tx_type:
            queryset = queryset.filter(type=tx_type)
        return queryset
    def perform_create(self, serializer):
        transaction = serializer.save(user=self.request.user)
        budget = transaction.budget
        if transaction.type == 'income':
            budget.total += transaction.amount
        else:  
            budget.total -= transaction.amount
        budget.save()

# Create your views here.
