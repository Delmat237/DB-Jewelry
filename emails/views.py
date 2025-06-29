from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.core.mail import send_mail
from django.conf import settings

class SendEmailView(APIView):
    """
    Endpoint pour envoyer un email.
    """
    permission_classes = [IsAuthenticated]

    def post(self, request):
        subject = request.data.get('subject')
        message = request.data.get('message')
        to_email = request.data.get('to_email')
        from_email = settings.DEFAULT_FROM_EMAIL

        if not all([subject, message, to_email]):
            return Response(
                {"error": "Les champs subject, message et to_email sont requis."},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            send_mail(
                subject,
                message,
                from_email,
                [to_email],
                fail_silently=False,
            )
            return Response({"status": "Email envoyé"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)