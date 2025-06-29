from django.db import models
from django.contrib.auth.models import User

class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    client_name = models.CharField(max_length=255)
    client_phone = models.CharField(max_length=20)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, choices=[
        ('PENDING', 'En attente'),
        ('COMPLETED', 'Complétée'),
        ('CANCELLED', 'Annulée'),
    ], default='PENDING')
    created_at = models.DateTimeField(auto_now_add=True)
    items = models.JSONField()  # Store cart items

    def __str__(self):
        return f"Commande {self.id} de {self.client_name}"