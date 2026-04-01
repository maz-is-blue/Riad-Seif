from django.contrib.auth import authenticate, get_user_model
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from rest_framework import status
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import AdminProfile
from .permissions import get_admin_permissions


def ensure_admin_profile(user):
    if not user:
        return None
    profile, _ = AdminProfile.objects.get_or_create(user=user, defaults={
        "role": "super" if user.is_superuser else "sub",
        "permissions": {} if user.is_superuser else {
            "content": {"view": True, "edit": True, "delete": False},
            "news": {"view": True, "edit": True, "delete": False},
            "team": {"view": True, "edit": True, "delete": False},
            "publications": {"view": True, "edit": True, "delete": False},
            "events": {"view": True, "edit": True, "delete": False},
            "memory": {"view": True, "edit": True, "delete": False},
            "archive": {"view": True, "edit": True, "delete": False},
        },
    })
    return profile


class ObtainAuthTokenView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get("username", "")
        password = request.data.get("password", "")

        if not username or not password:
            return Response(
                {"detail": "Username and password are required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        user = authenticate(request, username=username, password=password)

        if user is None and "@" in username:
            User = get_user_model()
            try:
                user_obj = User.objects.get(email__iexact=username)
            except User.DoesNotExist:
                user_obj = None
            if user_obj:
                user = authenticate(request, username=user_obj.username, password=password)

        if user is None:
            return Response(
                {"detail": "Invalid credentials."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        token, _ = Token.objects.get_or_create(user=user)
        return Response({"token": token.key}, status=status.HTTP_200_OK)


class ChangePasswordView(APIView):
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        current_password = request.data.get("current_password", "")
        new_password = request.data.get("new_password", "")

        if not current_password or not new_password:
            return Response(
                {"detail": "Both current_password and new_password are required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        user = request.user
        if not user.check_password(current_password):
            return Response(
                {"detail": "Current password is incorrect."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            validate_password(new_password, user=user)
        except ValidationError as exc:
            return Response(
                {"detail": exc.messages},
                status=status.HTTP_400_BAD_REQUEST,
            )

        user.set_password(new_password)
        user.save(update_fields=["password"])
        return Response({"detail": "Password updated."}, status=status.HTTP_200_OK)


class AdminMeView(APIView):
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        profile = ensure_admin_profile(user)
        return Response(
            {
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "is_superuser": user.is_superuser,
                "permissions": get_admin_permissions(user),
                "role": getattr(profile, "role", "sub"),
            }
        )


class AdminUsersView(APIView):
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if not request.user.is_superuser:
            return Response({"detail": "Forbidden."}, status=status.HTTP_403_FORBIDDEN)
        User = get_user_model()
        users = User.objects.filter(is_staff=True).order_by("username")
        data = []
        for user in users:
            profile = ensure_admin_profile(user)
            data.append(
                {
                    "id": user.id,
                    "username": user.username,
                    "email": user.email,
                    "is_superuser": user.is_superuser,
                    "role": profile.role if profile else "sub",
                    "permissions": profile.permissions if profile else {},
                }
            )
        return Response(data)

    def post(self, request):
        if not request.user.is_superuser:
            return Response({"detail": "Forbidden."}, status=status.HTTP_403_FORBIDDEN)
        payload = request.data or {}
        username = payload.get("username")
        email = payload.get("email", "")
        password = payload.get("password")
        permissions = payload.get("permissions", {})

        if not username or not password:
            return Response({"detail": "username and password are required."}, status=status.HTTP_400_BAD_REQUEST)

        User = get_user_model()
        if User.objects.filter(username=username).exists():
            return Response({"detail": "Username already exists."}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create_user(
            username=username,
            email=email,
            password=password,
            is_staff=True,
            is_superuser=False,
        )
        AdminProfile.objects.update_or_create(
            user=user,
            defaults={"role": "sub", "permissions": permissions},
        )
        return Response({"detail": "User created.", "id": user.id}, status=status.HTTP_201_CREATED)


class AdminUserDetailView(APIView):
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]

    def patch(self, request, user_id):
        if not request.user.is_superuser:
            return Response({"detail": "Forbidden."}, status=status.HTTP_403_FORBIDDEN)
        User = get_user_model()
        try:
            user = User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return Response({"detail": "User not found."}, status=status.HTTP_404_NOT_FOUND)

        payload = request.data or {}
        email = payload.get("email")
        password = payload.get("password")
        permissions = payload.get("permissions")
        role = payload.get("role")

        if email is not None:
            user.email = email
        if password:
            user.set_password(password)
        user.save()

        profile = ensure_admin_profile(user)
        if permissions is not None:
            profile.permissions = permissions
        if role in ("super", "sub") and not user.is_superuser:
            profile.role = role
        profile.save()

        return Response({"detail": "User updated."})

    def delete(self, request, user_id):
        if not request.user.is_superuser:
            return Response({"detail": "Forbidden."}, status=status.HTTP_403_FORBIDDEN)
        User = get_user_model()
        try:
            user = User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return Response({"detail": "User not found."}, status=status.HTTP_404_NOT_FOUND)
        if user.is_superuser:
            return Response({"detail": "Cannot delete superuser."}, status=status.HTTP_400_BAD_REQUEST)
        user.delete()
        return Response({"detail": "User deleted."})
