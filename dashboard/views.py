from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from orders.models import Order
from articles.models import Article
from django.db.models import Sum
from rest_framework import viewsets
from .models import Order
from .serializers import OrderSerializer, UserSerializer
from django.contrib.auth.models import User

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAdminUser]

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdminUser]

class ClientDashboardView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        """
        Tableau de bord client : commandes, total dépensé.
        """
        orders = Order.objects.filter(user=request.user)
        total_spent = orders.aggregate(Sum('total_amount'))['total_amount__sum'] or 0
        order_count = orders.count()
        data = {
            'order_count': order_count,
            'total_spent': float(total_spent),  # Convert Decimal to float for JSON
            'recent_orders': OrderSerializer(orders.order_by('-created_at')[:5], many=True).data,
        }
        return Response(data, status=status.HTTP_200_OK)

class AdminDashboardView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        """
        Tableau de bord admin : statistiques globales.
        """
        total_orders = Order.objects.count()
        total_revenue = Order.objects.aggregate(Sum('total_amount'))['total_amount__sum'] or 0
        low_stock_articles = Article.objects.filter(stock__lte=5).count()
        total_users = User.objects.count()
        recent_orders = OrderSerializer(Order.objects.order_by('-created_at')[:10], many=True).data
        data = {
            'total_orders': total_orders,
            'total_revenue': float(total_revenue),  # Convert Decimal to float
            'low_stock_articles': low_stock_articles,
            'total_users': total_users,
            'recent_orders': recent_orders,
        }
        return Response(data, status=status.HTTP_200_OK)