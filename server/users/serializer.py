from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    """
    Serializer for the User model.
    Handles converting User instances to JSON and validating incoming data.
    """

    # Custom format for created_at field.
    # Ensures the data/time is returned in 'DD/MM/YYYY HH:MM' format and is read-only.
    created_at = serializers.DateTimeField(format="%d/%m/%Y %H:%M", read_only=True)

    # Custom format for updated_at field, also read-only.
    updated_at = serializers.DateTimeField(format="%d/%m/%Y %H:%M", read_only=True)

    class Meta:
        # Specifies the model this serializer works with.
        model = User

        # Includes all fields from the User model in the serialization/deserialization process.
        fields = '__all__'

        # Alternatively, you could explicitly list fields:
        # fields = ['id', 'name', 'last_name', 'email', 'phone', 'created_at', 'updated_at']
