from rest_framework import serializers
from .models import Article, Category

class CategorySerializer(serializers.ModelSerializer):
     class Meta:
         model = Category
         fields = ['id', 'name', 'description']

class ArticleSerializer(serializers.ModelSerializer):
    """
        Serializer pour l'article, incluant l'URL de l'image.
    """

    category_id = serializers.PrimaryKeyRelatedField(
         queryset=Category.objects.all(), source='category'
     )
    image = serializers.ImageField(required=False, allow_null=True)  # Handle image uploads
    image_url = serializers.SerializerMethodField()  # Add image URL field

    class Meta:
        model = Article
        fields = ['id', 'name','category_id', 'description', 'price', 'stock', 'image', 'image_url', 'created_at', 'updated_at']

    def get_image_url(self, obj):
        """
        Retourne l'URL complète de l'image si elle existe.
        """
        if obj.image:
            return self.context['request'].build_absolute_uri(obj.image.url)
        return None