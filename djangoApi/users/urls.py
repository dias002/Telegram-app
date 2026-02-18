from django.urls import path
from .views import RegisterView, UserList, ProfilView
from rest_framework_simplejwt.views import ( TokenObtainPairView, TokenRefreshView, )


urlpatterns = [
    path('register/', RegisterView.as_view()),
    path('users/', UserList.as_view()),
    path('token/', TokenObtainPairView.as_view()),
    path('token/refresh/', TokenRefreshView.as_view()),
    path('profile/', ProfilView.as_view())
]
