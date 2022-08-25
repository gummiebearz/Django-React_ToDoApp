# SERIALIZATION MEANS COVERTING DJANGO MODELS (PYTHON CLASSES) to JSON OBJECTS AND VICE VERSA
from rest_framework import serializers
from .models import Todo

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        # specify the model to be returned
        model = Todo
        # specify the model's fields to be returned
        fields = ('id', 'title', 'description', 'completed')
