from cloudinary_storage.storage import MediaCloudinaryStorage
import os

class CustomCloudinaryStorage(MediaCloudinaryStorage):
    def _save(self, name, content):
        filename = os.path.splitext(os.path.basename(name))[0]
        folder = os.path.dirname(name)
        public_id = f"{folder}/{filename}" if folder else filename
        return super()._save(name, content, public_id=public_id, format='jpg')