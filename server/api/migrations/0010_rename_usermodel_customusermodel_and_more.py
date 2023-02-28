# Generated by Django 4.1.6 on 2023-02-27 22:25

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('api', '0009_usermodel_alter_productmodel_seller'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='UserModel',
            new_name='CustomUserModel',
        ),
        migrations.AlterField(
            model_name='productmodel',
            name='seller',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
