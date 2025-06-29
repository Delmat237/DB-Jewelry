from rest_framework import serializers
from .models import Order
from django.contrib.auth.models import User
from rest_framework import viewsets
from rest_framework.permissions import IsAdminUser
from rest_framework.serializers import Serializer, CharField, EmailField

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['id', 'user', 'client_name', 'client_phone', 'total_amount', 'status', 'items', 'created_at']


class UserSerializer(Serializer):
    username = CharField()
    email = EmailField()
    role = CharField(source='is_staff', read_only=True)

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['role'] = 'admin' if instance.is_staff else 'client'
        return representation