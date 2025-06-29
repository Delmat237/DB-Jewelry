from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from .models import Order
from .serializers import OrderSerializer
from cart.models import Cart

class OrderViewSet(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_permissions(self):
        if self.action in ['update', 'partial_update']:
            return [IsAdminUser()]
        return [IsAuthenticated()]

    def get_queryset(self):
        """
        Retourne les commandes de l'utilisateur connecté ou toutes les commandes pour un admin.
        """
        if self.request.user.is_staff:
            return Order.objects.all()
        return Order.objects.filter(user=self.request.user)

    def create(self, request, *args, **kwargs):
        """
        Crée une commande à partir du panier.
        """
        cart = Cart.objects.filter(user=request.user).first()
        if not cart or not cart.items.exists():
            return Response({'error': 'Panier vide'}, status=status.HTTP_400_BAD_REQUEST)

        total_amount = sum(item.article.price * item.quantity for item in cart.items.all())
        order = Order.objects.create(user=request.user, total_amount=total_amount)

        for item in cart.items.all():
            OrderItem.objects.create(
                order=order,
                article=item.article,
                quantity=item.quantity,
                price=item.article.price
            )
        cart.items.all().delete()  # Vider le panier après la commande
        return Response(OrderSerializer(order).data, status=status.HTTP_201_CREATED)