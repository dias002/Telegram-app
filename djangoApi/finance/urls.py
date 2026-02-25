from django.urls import path, include
from .views import CategoryViewsets, IncomeViewsets, ExpenceViewsets
urlpatterns = [
    path('category/',CategoryViewsets.as_view({"get":"list", "post":"create"})),
    path('category/<int:pk>/', CategoryViewsets.as_view({"get":"retrieve"})),
    path('income/', IncomeViewsets.as_view({"get":"list", "post":"create"})),
    path('expense/', ExpenceViewsets.as_view({"get":"list", "post":"create"}))
]