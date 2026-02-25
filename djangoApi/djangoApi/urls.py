from django.contrib import admin
from django.urls import path,include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('users.urls')),
    path('api/content/', include('finance.urls')),
    path('finance/', include('finance.urls')),
]
