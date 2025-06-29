from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Cart, CartItem
from .serializers import CartSerializer, CartItemSerializer

class CartViewSet(viewsets.ModelViewSet):
    serializer_class = CartSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """
        Retourne le panier de l'utilisateur connecté.
        """
        return Cart.objects.filter(user=self.request.user)

    @action(detail=False, methods=['post'])
    def add_item(self, request):
        """
        Ajoute un article au panier.
        """
        article_id = request.data.get('article_id')
        quantity = int(request.data.get('quantity', 1))
        cart, _ = Cart.objects.get_or_create(user=request.user)
        cart_item, created = CartItem.objects.get_or_create(
            cart=cart, article_id=article_id, defaults={'quantity': quantity}
        )
        if not created:
            cart_item.quantity += quantity
            cart_item.save()
        return Response(CartSerializer(cart).data, status=status.HTTP_200_OK)

    @action(detail=True, methods=['delete'])
    def remove_item(self, request, pk=None):
        """
        Supprime un article du panier.
        """
        cart = self.get_object()
        cart_item = cart.items.filter(id=pk).first()
        if cart_item:
            cart_item.delete()
            return Response(CartSerializer(cart).data, status=status.HTTP_200_OK)
        return Response({'error': 'Article non trouvé'}, status=status.HTTP_404_NOT_FOUND)