from rest_framework import serializers
from .models import Order, OrderItem
from articles.models import Article 
from articles.serializers import ArticleSerializer

class OrderItemSerializer(serializers.ModelSerializer):
    article = ArticleSerializer(read_only=True)
    article_id = serializers.PrimaryKeyRelatedField(
        queryset=Article.objects.all(), source='article', write_only=True
    )

    class Meta:
        model = OrderItem
        fields = ['id', 'article', 'article_id', 'quantity', 'price']

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = ['id', 'user', 'total_amount', 'status', 'items', 'created_at', 'updated_at']