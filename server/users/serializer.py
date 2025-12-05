# users/serializers.py
from rest_framework import serializers
from .models import CustomUser


class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(style={'input_type': 'password'}, write_only=True)

    # Custom format for created_at and updated_at field.
    # Ensures the data/time is returned in 'DD/MM/YYYY HH:MM' format and is read-only.
    created_at = serializers.DateTimeField(format="%d/%m/%Y %H:%M", read_only=True)
    updated_at = serializers.DateTimeField(format="%d/%m/%Y %H:%M", read_only=True)

    class Meta:
        model = CustomUser
        fields = ['identification',
                  'email',
                  'first_name',
                  'last_name',
                  'phone',
                  'address',
                  'password',
                  'created_at',
                  'updated_at']

    def create(self, validated_data):
            password = validated_data.pop('password')
            user = CustomUser.objects.create_user(
                password=password,
                **validated_data
            )
            return user


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'identification', 'first_name', 'last_name', 'email', 'phone', 'address']
        read_only_fields = ['id', 'email']  # si quieres que email no sea editable, cambia aquí

    def update(self, instance, validated_data):
        # actualizar sólo campos permitidos
        for attr in ['identification', 'first_name', 'last_name', 'phone', 'address']:
            if attr in validated_data:
                setattr(instance, attr, validated_data[attr])
        instance.save()
        return instance