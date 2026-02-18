from django.urls import path, include
from .views import CategoryViewsets, IncomeViewsets, ExpenceViewsets
urlpatterns = [
    path('category/<int:pk>/',CategoryViewsets.as_view({"get":"list", "post":"create"})),
    path('income/', IncomeViewsets.as_view({"get":"list", "post":"create"})),
    path('expence/', ExpenceViewsets.as_view({"get":"list", "post":"create"}))
]