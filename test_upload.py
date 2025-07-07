import cloudinary.uploader
from django.conf import settings

cloudinary.config(
        cloud_name="dpsgcq2lm" ,
        api_key="947711863868652",
        api_secret="ScwudoYNNfvsrmuZijXDaU5Vjx4"
    )
try:
        response = cloudinary.uploader.upload('images/banner.jpg', folder='images',  public_id='banner' )
        print(response)
except Exception as e:
        print(f"Upload failed: {e}")
    