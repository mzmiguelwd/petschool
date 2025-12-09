# users/serializers.py
from rest_framework import serializers
from .models import CustomUser


class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        style={'input_type': 'password'},
        write_only=True,
        required=False  # IMPORTANTE
    )

    email = serializers.EmailField(required=False)
    identification = serializers.CharField(required=False)

    # Custom format for created_at and updated_at field.
    # Ensures the data/time is returned in 'DD/MM/YYYY HH:MM' format and is read-only.
    created_at = serializers.DateTimeField(format="%d/%m/%Y %H:%M", read_only=True)
    updated_at = serializers.DateTimeField(format="%d/%m/%Y %H:%M", read_only=True)

    class Meta:
        model = CustomUser
        fields = ['id',
                  'identification',
                  'email',
                  'first_name',
                  'last_name',
                  'phone',
                  'address',
                  'password',
                  'created_at',
                  'updated_at',
                  'role']

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
        
        fields = [
            'id',
            'email',
            'first_name',
            'last_name',
            'phone',
            'address',
            'identification',
            'role'
        ]
        
        read_only_fields = [
            'id',
            'email'
        ]

    def update(self, instance, validated_data):
        for attr in ['identification', 'first_name', 'last_name', 'phone', 'address', 'role']:
            if attr in validated_data:
                setattr(instance, attr, validated_data[attr])
        instance.save()
        return instance