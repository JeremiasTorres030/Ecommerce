# Generated by Django 4.1.6 on 2023-03-05 16:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0015_alter_customusermodel_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customusermodel',
            name='image',
            field=models.ImageField(default='ecommer/images/user_sfttie', upload_to='./images'),
        ),
    ]