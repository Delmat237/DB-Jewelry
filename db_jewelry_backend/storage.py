import requests
from django.conf import settings
from django.core.files.storage import Storage
from django.core.files.base import ContentFile

class SupabaseStorage(Storage):
            def __init__(self):
                self.project_url = settings.SUPABASE_URL
                self.api_key = settings.SUPABASE_KEY
                self.bucket_name = settings.SUPABASE_BUCKET

            def _save(self, name, content):
                url = f"{self.project_url}/storage/v1/object/{self.bucket_name}/{name}"
                headers = {
                    "Authorization": f"Bearer {self.api_key}",
                    "Content-Type": "application/octet-stream",
                }
                response = requests.post(url, data=content, headers=headers)
                response.raise_for_status()
                return name

            def url(self, name):
                return f"{self.project_url}/storage/v1/object/public/{self.bucket_name}/{name}"

            def exists(self, name):
                url = self.url(name)
                response = requests.head(url)
                return response.status_code == 200

            def delete(self, name):
                url = f"{self.project_url}/storage/v1/object/{self.bucket_name}/{name}"
                headers = {"Authorization": f"Bearer {self.api_key}"}
                response = requests.delete(url, headers=headers)
                response.raise_for_status()
