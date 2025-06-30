#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys


def main():
    """Run administrative tasks."""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'db_jewelry_backend.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc

    # Créer le superutilisateur uniquement si on exécute le serveur
    if len(sys.argv) > 1 and sys.argv[1] == "runserver":
        try:
            from django.contrib.auth import get_user_model
            import django
            django.setup()
            User = get_user_model()
            if not User.objects.filter(username="admin").exists():
                User.objects.create_superuser("admin", "azangueleonel9@gmail.com", "adminpass")
                print("✅ Superuser créé automatiquement.")
        except Exception as e:
            print("⚠️ Erreur lors de la création du superutilisateur :", e)

    execute_from_command_line(sys.argv)


if __name__ == '__main__':
    main()
