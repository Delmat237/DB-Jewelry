import os
import django
from django.conf import settings
import cloudinary.uploader
import logging

# Configure Django settings
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'db_jewelry_backend.settings')
django.setup()

logging.basicConfig(level=logging.DEBUG)

try:
    cloudinary.config(
        cloud_name=settings.CLOUDINARY_STORAGE['CLOUD_NAME'],
        api_key=settings.CLOUDINARY_STORAGE['API_KEY'],
        api_secret=settings.CLOUDINARY_STORAGE['API_SECRET']
    )
    response = cloudinary.uploader.upload(
        'PATEK.jpeg',
        folder='images',
        public_id='PATEK',  # Explicitly set public_id
        overwrite=True,
        resource_type='image',
        format='jpg'  # Force .jpg extension
    )
    print(response)
except Exception as e:
    print(f"Upload failed: {e}")