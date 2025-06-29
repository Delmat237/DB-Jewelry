from rest_framework import viewsets
from rest_framework.permissions import IsAdminUser, AllowAny
from .models import Article, Category
from .serializers import ArticleSerializer, CategorySerializer

class ArticleViewSet(viewsets.ModelViewSet):
    """
    ViewSet pour gérer les opérations CRUD sur les articles.
    """
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer

    def get_permissions(self):
        """
        Les utilisateurs non-admin peuvent uniquement lire les articles.
        Les admins peuvent créer, mettre à jour et supprimer.
        """
        if self.action in ['list', 'retrieve']:
            return [AllowAny()]
        return [IsAdminUser()]

class CategoryViewSet(viewsets.ModelViewSet):
    """
    ViewSet pour gérer les opérations CRUD sur les catégories.
    """
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    def get_permissions(self):
        """
        Tout le monde peut lister les catégories, mais seules les admins peuvent créer, mettre à jour ou supprimer.
        """
        if self.action in ['list', 'retrieve']:
            return [AllowAny()]
        return [IsAdminUser()]