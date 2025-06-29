from rest_framework import serializers
from .models import Comment
from articles.models import Article 
from articles.serializers import ArticleSerializer

class CommentSerializer(serializers.ModelSerializer):
    article = ArticleSerializer(read_only=True)
    article_id = serializers.PrimaryKeyRelatedField(
        queryset=Article.objects.all(), source='article', write_only=True
    )
    user = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Comment
        fields = ['id', 'user', 'article', 'article_id', 'text', 'rating', 'created_at']