from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    """
    Personnalise la réponse du token JWT pour inclure des informations utilisateur.
    """
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        token['email'] = user.email
        token['role'] = 'admin' if user.is_staff else 'client'
        token['first_name'] = user.first_name
        token['last_name'] = user.last_name
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        # Include user info in the response
        data['user'] = {
            'username': self.user.username,
            'email': self.user.email,
            'role': 'admin' if self.user.is_staff else 'client',
            'first_name': self.user.first_name,
            'last_name': self.user.last_name
        }
        return data

class UserSerializer(serializers.ModelSerializer):
    """
    Serializer pour l'inscription et la gestion du profil utilisateur.
    """
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'first_name', 'last_name']
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def create(self, validated_data):
        """
        Crée un nouvel utilisateur avec mot de passe haché.
        """
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', '')
        )
        return user

    def update(self, instance, validated_data):
        """
        Met à jour le profil utilisateur, avec gestion du mot de passe.
        """
        instance.username = validated_data.get('username', instance.username)
        instance.email = validated_data.get('email', instance.email)
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        if validated_data.get('password'):
            instance.set_password(validated_data['password'])
        instance.save()
        return instance