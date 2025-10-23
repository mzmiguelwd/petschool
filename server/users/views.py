from rest_framework import viewsets
from .serializer import UserRegistrationSerializer
from .models import CustomUser

# Create your views here.

class UserView(viewsets.ModelViewSet):
    """
    A ModelViewSet that provides standard CRUD operations (Create, Read, Update, Delete)
    for the User model via the API.

    This ViewSet automatically handles HTTP methods (GET, POST, PUT, DELETE)
    for both list and detail endpoints.
    """

    # Specifies the serializer class responsible for converting model instances to JSON
    # and validating incoming data.
    serializer_class = UserRegistrationSerializer

    # Defines the base queryset that returns all available User objects.
    # This set of objects will be used for all operations (listing, retrieving, etc.).
    queryset = CustomUser.objects.all()

    # TODO: Consider adding permission classes (e.g., permissions.IsAuthenticated)
    # to restrict access to these endpoints for security.
