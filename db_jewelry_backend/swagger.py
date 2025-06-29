from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions

schema_view = get_schema_view(
    openapi.Info(
        title="DB Jewelry API",
        default_version='v1',
        description="API pour la plateforme de vente de bijoux DB Jewelry",
        contact=openapi.Contact(email="contact@db-jewelry.com"),
        license=openapi.License(name="MIT License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)