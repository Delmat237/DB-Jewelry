from django.db import models
from django.contrib.auth.models import User
from articles.models import Article

class Order(models.Model):
    STATUS_CHOICES = (
        ('PENDING', 'En attente'),
        ('PAID', 'Payée'),
        ('SHIPPED', 'Expédiée'),
        ('DELIVERED', 'Livrée'),
    )
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='orders')
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='PENDING')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Commande {self.id} - {self.user.username}"

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    article = models.ForeignKey(Article, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)  # Prix au moment de la commande

    def __str__(self):
        return f"{self.quantity} x {self.article.name}"