"""
URL configuration for db_jewelry_backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from articles.views import ArticleViewSet,CategoryViewSet
from cart.views import CartViewSet
from orders.views import OrderViewSet
from payments.views import PaymentView, PaymentCallbackView
from comments.views import CommentViewSet
from emails.views import SendEmailView
from dashboard.views import ClientDashboardView, AdminDashboardView,OrderViewSet, UserViewSet

from authentication.views import CustomTokenObtainPairView, RegisterView, ProfileView
from rest_framework_simplejwt.views import TokenRefreshView 
from .swagger import schema_view
from django.conf import settings
from django.conf.urls.static import static

router = DefaultRouter()
router.register(r'articles', ArticleViewSet)
router.register(r'cart', CartViewSet, basename='cart')
router.register(r'orders', OrderViewSet, basename='orders')
router.register(r'comments', CommentViewSet)
router.register(r'categories', CategoryViewSet)
router.register(r'orders', OrderViewSet)
router.register(r'users', UserViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
     path('api/', include(router.urls)),
    path('api/auth/login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/auth/register/', RegisterView.as_view(), name='register'),
    path('api/auth/profile/', ProfileView.as_view(), name='profile'),
    path('api/payments/', PaymentView.as_view(), name='payment'),
    path('api/payments/callback/', PaymentCallbackView.as_view(), name='payment-callback'),
    path('api/send-email/', SendEmailView.as_view(), name='send-email'),
    path('api/dashboard/client/', ClientDashboardView.as_view(), name='client-dashboard'),
    path('api/dashboard/admin/', AdminDashboardView.as_view(), name='admin-dashboard'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
] 