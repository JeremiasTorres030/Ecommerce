# Generated by Django 4.1.6 on 2023-02-23 19:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_productmodel_type'),
    ]

    operations = [
        migrations.AlterField(
            model_name='productmodel',
            name='type',
            field=models.CharField(default='', max_length=40),
        ),
    ]
