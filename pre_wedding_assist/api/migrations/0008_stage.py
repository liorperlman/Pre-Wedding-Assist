# Generated by Django 4.2.2 on 2024-01-01 16:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_table_x_table_y'),
    ]

    operations = [
        migrations.CreateModel(
            name='Stage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, unique=True)),
                ('x', models.FloatField(default=0)),
                ('y', models.FloatField(default=0)),
            ],
        ),
    ]
