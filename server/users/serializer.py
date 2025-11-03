from rest_framework import serializers
from .models import CustomUser

class UserRegistrationSerializer(serializers.ModelSerializer):

    password = serializers.CharField(style={'input_type': 'password'}, write_only=True)
    match_password = serializers.CharField(style={'input_type': 'password'}, write_only=True)

    # Custom format for created_at and updated_at field.
    # Ensures the data/time is returned in 'DD/MM/YYYY HH:MM' format and is read-only.
    created_at = serializers.DateTimeField(format="%d/%m/%Y %H:%M", read_only=True)
    updated_at = serializers.DateTimeField(format="%d/%m/%Y %H:%M", read_only=True)

    class Meta:
        # Specifies the model this serializer works with.
        model = CustomUser

        # Incluye todos los campos de datos, más los campos de validación (contraseñas)
        fields = ['identification',
                  'email',
                  'first_name',
                  'last_name',
                  'phone',
                  'address',
                  'password',
                  'match_password',
                  'created_at',
                  'updated_at']
    
    def validate(self, data):
        password = data.get('password')
        match_password = data.get('match_password')

        if not password:
            raise serializers.ValidationError({"password": "La contraseña es obligatoria."})
            
        if not match_password:
            raise serializers.ValidationError({"match_password": "La confirmación de contraseña es obligatoria."})
            
        if password != match_password:
            raise serializers.ValidationError({"match_password": "Las contraseñas no coinciden."})
    
        return data

    def create(self, validated_data):
            password = validated_data.pop('password')
            validated_data.pop('match_password') # Elimina este campo antes de pasarlo al modelo

            # Como los demás campos coinciden con el modelo, se pasan directamente
            user = CustomUser.objects.create_user(
                password=password,
                **validated_data
            )

            return user