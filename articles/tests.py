
from django.test import TestCase
from rest_framework.test import APIClient
from .models import Article, Category
from django.contrib.auth.models import User

class ArticleTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='testuser', password='testpass')
        self.admin = User.objects.create_superuser(username='admin', password='adminpass')
        self.category = Category.objects.create(name='Bagues')
        self.article = Article.objects.create(
            name='Bague Or', description='Bague en or 18k', price=100.00,
            stock=10, category=self.category
        )

    def test_get_articles(self):
        response = self.client.get('/api/articles/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)