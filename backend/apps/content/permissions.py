from rest_framework.permissions import BasePermission


def _normalize_permissions(perms):
    return perms if isinstance(perms, dict) else {}


def get_admin_permissions(user):
    if not user or not user.is_authenticated:
        return {}
    if user.is_superuser:
        return {"*": {"view": True, "edit": True, "delete": True}}
    profile = getattr(user, "admin_profile", None)
    return _normalize_permissions(getattr(profile, "permissions", {}))


def has_permission(user, resource: str, action: str) -> bool:
    if not user or not user.is_authenticated or not user.is_staff:
        return False
    if user.is_superuser:
        return True
    perms = get_admin_permissions(user)
    resource_perms = perms.get(resource, {})
    return bool(resource_perms.get(action))


def has_any_edit_permission(user) -> bool:
    if not user or not user.is_authenticated or not user.is_staff:
        return False
    if user.is_superuser:
        return True
    perms = get_admin_permissions(user)
    return any(section.get("edit") for section in perms.values() if isinstance(section, dict))


class AdminSectionPermission(BasePermission):
    resource = ""

    @classmethod
    def for_resource(cls, resource: str):
        return type(f"{resource.title()}Permission", (cls,), {"resource": resource})

    def has_permission(self, request, view):
        method = request.method.upper()
        if method in ("GET", "HEAD", "OPTIONS"):
            action = "view"
        elif method == "DELETE":
            action = "delete"
        else:
            action = "edit"
        return has_permission(request.user, self.resource, action)
