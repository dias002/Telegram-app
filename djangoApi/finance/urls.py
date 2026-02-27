
from django.urls import path
from .views import CategoryViewSet, BudgetViewSet, TransactionViewSet

urlpatterns = [
    path('category/', CategoryViewSet.as_view({"get": "list", "post": "create"})),
    path('category/<int:pk>/', CategoryViewSet.as_view({"get": "retrieve"})),
    path('budget/', BudgetViewSet.as_view({"get": "list", "post": "create"})),
    path('budget/<int:pk>/', BudgetViewSet.as_view({"get": "retrieve"})),
    path('transaction/', TransactionViewSet.as_view({"get": "list", "post": "create"})),
    path('transaction/<int:pk>/', TransactionViewSet.as_view({"get": "retrieve"})),
]