# Generated by Django 4.1.6 on 2023-02-23 19:50

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_alter_productmodel_type'),
    ]

    operations = [
        migrations.RenameField(
            model_name='productmodel',
            old_name='type',
            new_name='sub_category',
        ),
    ]
