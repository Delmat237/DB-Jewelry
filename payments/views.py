from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny  # Add this import
import requests
from django.conf import settings
from orders.models import Order

class PaymentView(APIView):
     permission_classes = [IsAuthenticated]

     def post(self, request):
        cart = request.data.get('cart', [])
        client_name = request.data.get('client_name', '')
        client_phone = request.data.get('client_phone', '')

        if not cart or not client_name or not client_phone:
            return Response(
                {'status': 'ERROR', 'message': 'Données incomplètes.'},
                status=400
            )

        # Calculate total amount
        total_amount = sum(item['price'] * item['quantity'] for item in cart)

        # CinetPay API configuration (replace with your credentials)
        cinetpay_data = {
            'apikey': settings.CINETPAY_API_KEY,
            'site_id': settings.CINETPAY_SITE_ID,
            'transaction_id': f'ORDER_{request.user.id}_{int(time.time())}',
            'amount': total_amount,
            'currency': 'XAF',
            'description': f'Paiement pour commande de {client_name}',
            'customer_name': client_name,
            'customer_phone': client_phone,
            'channels': 'MOBILE_MONEY',
            'notify_url': f'{settings.BASE_URL}/api/payment-notify/',
            'return_url': f'{settings.FRONTEND_URL}/success',
        }

        try:
            response = requests.post(
                'https://api.cinetpay.com/v2/payment',
                json=cinetpay_data
            )
            response_data = response.json()

            if response_data.get('code') == '201':
                return Response({
                    'status': 'SUCCESS',
                    'payment_url': response_data['data']['payment_url']
                })
            else:
                return Response({
                    'status': 'ERROR',
                    'message': response_data.get('message', 'Erreur lors de l’initialisation du paiement.')
                }, status=400)
        except Exception as e:
            return Response({
                'status': 'ERROR',
                'message': f'Erreur réseau: {str(e)}'
            }, status=500)

class PaymentCallbackView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        """
        Gère le callback de CinetPay pour confirmer le paiement.
        """
        transaction_id = request.data.get('transaction_id')
        order_id = transaction_id.replace('DBJ_', '')
        order = Order.objects.filter(id=order_id).first()

        if order and request.data.get('status') == 'SUCCESS':
            order.status = 'PAID'
            order.save()
            send_mail(
                'Confirmation de paiement',
                f"Votre paiement pour la commande {order_id} a été confirmé.",
                settings.DEFAULT_FROM_EMAIL,
                [order.user.email],
                fail_silently=True,
            )
        return Response({'status': 'Callback reçu'}, status=status.HTTP_200_OK)