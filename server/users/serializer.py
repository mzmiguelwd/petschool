from rest_framework import serializers
from .models import CustomUser

class UserRegistrationSerializer(serializers.ModelSerializer):
    """
    Serializer for the User model.
    Handles converting User instances to JSON and validating incoming data.
    """

    pwd = serializers.CharField(style={'input_type': 'password'}, write_only=True)
    match_pwd = serializers.CharField(style={'input_type': 'password'}, write_only=True)

    name = serializers.CharField(source='first_name')
    last_name = serializers.CharField()

    # Custom format for created_at field.
    # Ensures the data/time is returned in 'DD/MM/YYYY HH:MM' format and is read-only.
    created_at = serializers.DateTimeField(format="%d/%m/%Y %H:%M", read_only=True)

    # Custom format for updated_at field, also read-only.
    updated_at = serializers.DateTimeField(format="%d/%m/%Y %H:%M", read_only=True)

    class Meta:
        # Specifies the model this serializer works with.
        model = CustomUser

        # Includes all fields from the User model in the serialization/deserialization process.
        fields = ['identification', 'email', 'name', 'last_name', 'phone', 'address', 'pwd', 'match_pwd', 'created_at', 'updated_at']

        read_only_fields = ('created_at', 'updated_at')
    
    def validate(self, data):
        pwd = data.get('pwd')
        match_pwd = data.get('match_pwd')

        if not pwd:
            raise serializers.ValidationError({"pwd": "La contraseña es obligatoria."})
            
        if not match_pwd:
            raise serializers.ValidationError({"match_pwd": "La confirmación de contraseña es obligatoria."})
            
        if pwd != match_pwd:
            raise serializers.ValidationError({"match_pwd": "Las contraseñas no coinciden."})
    
        return data

    def create(self, validated_data):
            password = validated_data.pop('pwd')
            validated_data.pop('match_pwd')

            user = CustomUser.objects.create_user(
                password=password,
                **validated_data
            )

            return user