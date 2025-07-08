from rest_framework import serializers
from .models import Article, Category
import cloudinary.uploader
from django.conf import settings

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'description']

class ArticleSerializer(serializers.ModelSerializer):
    """
    Serializer pour l'article, incluant l'URL de l'image avec upload manuel vers Cloudinary.
    """
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(), source='category'
    )
    image = serializers.ImageField(required=False, allow_null=True)  # Handle image uploads
    image_url = serializers.SerializerMethodField()  # Add image URL field

    class Meta:
        model = Article
        fields = ['id', 'name', 'category_id', 'description', 'price', 'stock', 'image', 'image_url', 'created_at', 'updated_at']

    def get_image_url(self, obj):
        """
        Retourne l'URL complète de l'image si elle existe.
        """
        if obj.image:
            return f"https://res.cloudinary.com/{settings.CLOUDINARY_STORAGE['CLOUD_NAME']}/image/upload/{obj.image}"
        return None

    def create(self, validated_data):
        """
        Gère la création d'un article avec upload manuel de l'image vers Cloudinary.
        """
        image = validated_data.pop('image', None)
        if image:
            # Générer un public_id basé sur le nom du fichier (sans extension)
            image_name = os.path.splitext(image.name)[0]
            public_id = f"images/{image_name}"
            try:
                # Uploader l'image vers Cloudinary
                upload_result = cloudinary.uploader.upload(
                    image,
                    public_id=public_id,
                    folder='images',
                    overwrite=True,
                    resource_type='image',
                    format='jpg'
                )
                validated_data['image'] = f"{public_id}.jpg"
            except Exception as e:
                raise serializers.ValidationError(f"Échec de l'upload de l'image: {e}")
        return super().create(validated_data)

    def update(self, instance, validated_data):
        """
        Gère la mise à jour d'un article avec upload manuel de l'image si fournie.
        """
        image = validated_data.pop('image', None)
        if image:
            # Générer un public_id basé sur le nom du fichier
            image_name = os.path.splitext(image.name)[0]
            public_id = f"images/{image_name}"
            try:
                # Uploader l'image vers Cloudinary
                upload_result = cloudinary.uploader.upload(
                    image,
                    public_id=public_id,
                    folder='images',
                    overwrite=True,
                    resource_type='image',
                    format='jpg'
                )
                validated_data['image'] = f"{public_id}.jpg"
            except Exception as e:
                raise serializers.ValidationError(f"Échec de l'upload de l'image: {e}")
        return super().update(instance, validated_data)