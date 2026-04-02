import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import {
  changeAdminPassword,
  fetchAdminMe,
  listAdminUsers,
  createAdminUser,
  updateAdminUser,
  deleteAdminUser,
  loginAdmin,
  type AdminUser,
} from "../../utils/api";

type PermissionFlags = {
  view?: boolean;
  edit?: boolean;
  delete?: boolean;
};

type PermissionsMap = Record<string, PermissionFlags>;

type AdminAccountProps = {
  lang: "ar" | "en";
};

const DEFAULT_PERMISSIONS: PermissionsMap = {
  content: { view: true, edit: true, delete: false },
  news: { view: true, edit: true, delete: false },
  jobs: { view: true, edit: true, delete: false },
  team: { view: true, edit: true, delete: false },
  publications: { view: true, edit: true, delete: false },
  events: { view: true, edit: true, delete: false },
  memory: { view: true, edit: true, delete: false },
  archive: { view: true, edit: true, delete: false },
};

const buildPermissions = (checked: boolean): PermissionsMap =>
  Object.fromEntries(
    Object.entries(DEFAULT_PERMISSIONS).map(([key, value]) => [
      key,
      {
        view: checked ? true : value.view,
        edit: checked,
        delete: checked,
      },
    ]),
  );

type EditableAdminUser = {
  id: number;
  email: string;
  permissions: PermissionsMap;
  password: string;
};

export default function AdminAccount({ lang }: AdminAccountProps) {
  const isRTL = lang === "ar";
  const [token, setToken] = useState(() => window.localStorage.getItem("rs_admin_token") ?? "");
  const [status, setStatus] = useState("");
  const [me, setMe] = useState<AdminUser | null>(null);
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordStatus, setPasswordStatus] = useState("");
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [usersStatus, setUsersStatus] = useState("");
  const [creating, setCreating] = useState(false);
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
    permissions: { ...DEFAULT_PERMISSIONS },
  });
  const [editingUserId, setEditingUserId] = useState<number | null>(null);
  const [editingUser, setEditingUser] = useState<EditableAdminUser | null>(null);

  const permissionsKeys = useMemo(() => Object.keys(DEFAULT_PERMISSIONS), []);

  const labels = {
    enterCredentials: isRTL ? "أدخل بيانات الدخول." : "Enter credentials.",
    loggedIn: isRTL ? "تم تسجيل الدخول." : "Logged in.",
    loginFailed: isRTL ? "فشل تسجيل الدخول." : "Login failed.",
    fillAllFields: isRTL ? "يرجى تعبئة جميع الحقول." : "Please fill in all fields.",
    passwordsMismatch: isRTL ? "كلمتا المرور غير متطابقتين." : "Passwords do not match.",
    passwordUpdated: isRTL ? "تم تحديث كلمة المرور." : "Password updated.",
    passwordUpdateFailed: isRTL ? "فشل تحديث كلمة المرور." : "Password update failed.",
    userRequired: isRTL ? "اسم المستخدم وكلمة المرور مطلوبان." : "Username and password are required.",
    userCreated: isRTL ? "تم إنشاء المستخدم." : "User created.",
    userCreateFailed: isRTL ? "فشل إنشاء المستخدم." : "Failed to create user.",
    userUpdated: isRTL ? "تم تحديث المستخدم." : "User updated.",
    updateFailed: isRTL ? "فشل التحديث." : "Update failed.",
    userDeleted: isRTL ? "تم الحذف." : "Deleted.",
    deleteFailed: isRTL ? "فشل الحذف." : "Delete failed.",
    signInTitle: isRTL ? "تسجيل الدخول إلى لوحة الإدارة" : "Sign in to Admin",
    username: isRTL ? "اسم المستخدم" : "Username",
    password: isRTL ? "كلمة المرور" : "Password",
    login: isRTL ? "تسجيل الدخول" : "Login",
    adminAccount: isRTL ? "إعدادات الحساب" : "Admin Account",
    adminAccountDesc: isRTL ? "إدارة كلمة المرور وصلاحيات المشرفين." : "Manage passwords and admin permissions.",
    dashboard: isRTL ? "لوحة الإدارة" : "Dashboard",
    logout: isRTL ? "تسجيل الخروج" : "Logout",
    changePassword: isRTL ? "تغيير كلمة المرور" : "Change Password",
    currentPassword: isRTL ? "كلمة المرور الحالية" : "Current Password",
    newPassword: isRTL ? "كلمة المرور الجديدة" : "New Password",
    confirmPassword: isRTL ? "تأكيد كلمة المرور" : "Confirm Password",
    updatePassword: isRTL ? "تحديث كلمة المرور" : "Update Password",
    subAdmins: isRTL ? "إدارة المشرفين الفرعيين" : "Sub Admins",
    currentUsers: isRTL ? "المستخدمون الحاليون" : "Current Users",
    noSubAdmins: isRTL ? "لا يوجد مشرفون فرعيون بعد." : "No sub admins yet.",
    editPermissions: isRTL ? "تعديل الصلاحيات" : "Edit Permissions",
    createAdmin: isRTL ? "إضافة مشرف" : "Create Admin",
    email: isRTL ? "البريد الإلكتروني" : "Email",
    newPasswordOptional: isRTL ? "كلمة مرور جديدة (اختياري)" : "New Password (optional)",
    save: isRTL ? "حفظ" : "Save",
    cancel: isRTL ? "إلغاء" : "Cancel",
    edit: isRTL ? "تعديل" : "Edit",
    delete: isRTL ? "حذف" : "Delete",
    create: isRTL ? "إضافة مشرف" : "Create",
    creating: isRTL ? "جارٍ الإنشاء..." : "Creating...",
    selectAll: isRTL ? "تحديد الكل" : "Select all",
    clearAll: isRTL ? "إلغاء الكل" : "Clear all",
  };

  const loadMe = () => {
    if (!token) return;
    fetchAdminMe(token)
      .then((data) => setMe(data))
      .catch(() => setMe(null));
  };

  const loadUsers = () => {
    if (!token) return;
    listAdminUsers(token)
      .then((data) => setUsers(data ?? []))
      .catch(() => setUsers([]));
  };

  useEffect(() => {
    loadMe();
    loadUsers();
  }, [token]);

  const handleLogin = () => {
    if (!credentials.username || !credentials.password) {
      setStatus(labels.enterCredentials);
      return;
    }
    loginAdmin(credentials.username, credentials.password)
      .then((response) => {
        window.localStorage.setItem("rs_admin_token", response.token);
        setToken(response.token);
        setStatus(labels.loggedIn);
      })
      .catch(() => {
        setStatus(labels.loginFailed);
      });
  };

  const handleLogout = () => {
    window.localStorage.removeItem("rs_admin_token");
    setToken("");
    setMe(null);
    setUsers([]);
  };

  const handlePasswordChange = () => {
    if (!token) return;
    if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      setPasswordStatus(labels.fillAllFields);
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordStatus(labels.passwordsMismatch);
      return;
    }
    changeAdminPassword(token, passwordForm.currentPassword, passwordForm.newPassword)
      .then((response) => {
        setPasswordStatus(response?.detail ?? labels.passwordUpdated);
        setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
      })
      .catch((error) => {
        const message = error?.detail?.[0] ?? error?.detail ?? labels.passwordUpdateFailed;
        setPasswordStatus(Array.isArray(message) ? message[0] : message);
      });
  };

  const handleCreateUser = () => {
    if (!token) return;
    if (!newUser.username || !newUser.password) {
      setUsersStatus(labels.userRequired);
      return;
    }
    setCreating(true);
    createAdminUser(token, newUser)
      .then(() => {
        setUsersStatus(labels.userCreated);
        setNewUser({ username: "", email: "", password: "", permissions: { ...DEFAULT_PERMISSIONS } });
        loadUsers();
      })
      .catch((error) => {
        const message = error?.detail ?? labels.userCreateFailed;
        setUsersStatus(Array.isArray(message) ? message[0] : message);
      })
      .finally(() => setCreating(false));
  };

  const handleEditUser = (user: AdminUser) => {
    setEditingUserId(user.id);
    setEditingUser({
      id: user.id,
      email: user.email ?? "",
      permissions: user.permissions ?? { ...DEFAULT_PERMISSIONS },
      password: "",
    });
  };

  const handleUpdateUser = () => {
    if (!token || !editingUser) return;
    updateAdminUser(token, editingUser.id, {
      email: editingUser.email,
      password: editingUser.password || undefined,
      permissions: editingUser.permissions,
    })
      .then(() => {
        setUsersStatus(labels.userUpdated);
        setEditingUserId(null);
        setEditingUser(null);
        loadUsers();
      })
      .catch((error) => {
        const message = error?.detail ?? labels.updateFailed;
        setUsersStatus(Array.isArray(message) ? message[0] : message);
      });
  };

  const handleDeleteUser = (userId: number) => {
    if (!token) return;
    deleteAdminUser(token, userId)
      .then(() => {
        setUsersStatus(labels.userDeleted);
        loadUsers();
      })
      .catch((error) => {
        const message = error?.detail ?? labels.deleteFailed;
        setUsersStatus(Array.isArray(message) ? message[0] : message);
      });
  };

  const updatePermissionField = (
    target: "new" | "edit",
    permissionKey: string,
    action: "view" | "edit" | "delete",
    checked: boolean,
  ) => {
    if (target === "new") {
      setNewUser((prev) => ({
        ...prev,
        permissions: {
          ...prev.permissions,
          [permissionKey]: {
            ...prev.permissions?.[permissionKey],
            [action]: checked,
          },
        },
      }));
      return;
    }
    setEditingUser((prev) =>
      prev
        ? {
            ...prev,
            permissions: {
              ...prev.permissions,
              [permissionKey]: {
                ...prev.permissions?.[permissionKey],
                [action]: checked,
              },
            },
          }
        : prev,
    );
  };

  const applyAllPermissions = (target: "new" | "edit", checked: boolean) => {
    if (target === "new") {
      setNewUser((prev) => ({ ...prev, permissions: buildPermissions(checked) }));
      return;
    }
    setEditingUser((prev) => (prev ? { ...prev, permissions: buildPermissions(checked) } : prev));
  };

  const renderPermissionsEditor = (target: "new" | "edit", permissions: PermissionsMap) => (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700"
          onClick={() => applyAllPermissions(target, true)}
        >
          {labels.selectAll}
        </button>
        <button
          type="button"
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700"
          onClick={() => applyAllPermissions(target, false)}
        >
          {labels.clearAll}
        </button>
      </div>
      {permissionsKeys.map((key) => (
        <div key={key} className="rounded-lg border border-slate-200 p-3">
          <div className="mb-2 text-sm font-semibold text-[#1c3944]">{key}</div>
          <div className="flex flex-wrap gap-4 text-sm">
            {(["view", "edit", "delete"] as const).map((action) => (
              <label key={action} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={Boolean(permissions?.[key]?.[action])}
                  onChange={(event) => updatePermissionField(target, key, action, event.target.checked)}
                />
                {action}
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  if (!token) {
    return (
      <section className="bg-slate-50 py-16 lg:py-24">
        <div className="mx-auto max-w-md px-6 lg:px-8">
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <h2 className="mb-4 text-xl font-semibold text-[#1c3944]">{labels.signInTitle}</h2>
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm text-slate-600">{labels.username}</label>
                <input
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                  value={credentials.username}
                  onChange={(event) => setCredentials({ ...credentials, username: event.target.value })}
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-slate-600">{labels.password}</label>
                <input
                  type="password"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                  value={credentials.password}
                  onChange={(event) => setCredentials({ ...credentials, password: event.target.value })}
                />
              </div>
              <button
                type="button"
                className="w-full rounded-lg bg-[#1c3944] px-4 py-2 text-white hover:bg-[#122c35]"
                onClick={handleLogin}
              >
                {labels.login}
              </button>
              {status && <div className="text-sm text-slate-600">{status}</div>}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-slate-50 py-16 lg:py-24">
      <div className="mx-auto max-w-6xl space-y-8 px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold text-[#1c3944] lg:text-4xl">{labels.adminAccount}</h1>
            <p className="text-slate-600">{labels.adminAccountDesc}</p>
          </div>
          <div className="flex gap-3">
            <Link href="/admin">
              <span className="cursor-pointer text-sm font-semibold text-[#1c3944]">{labels.dashboard}</span>
            </Link>
            <button type="button" className="text-sm text-slate-600" onClick={handleLogout}>
              {labels.logout}
            </button>
          </div>
        </div>

        <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-6">
          <div className="text-lg font-semibold text-[#1c3944]">{labels.changePassword}</div>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-500">{labels.currentPassword}</label>
              <input
                type="password"
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                value={passwordForm.currentPassword}
                onChange={(event) =>
                  setPasswordForm({ ...passwordForm, currentPassword: event.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-500">{labels.newPassword}</label>
              <input
                type="password"
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                value={passwordForm.newPassword}
                onChange={(event) => setPasswordForm({ ...passwordForm, newPassword: event.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-500">{labels.confirmPassword}</label>
              <input
                type="password"
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                value={passwordForm.confirmPassword}
                onChange={(event) =>
                  setPasswordForm({ ...passwordForm, confirmPassword: event.target.value })
                }
              />
            </div>
          </div>
          <button
            type="button"
            className="w-full rounded-lg bg-[#1c3944] px-4 py-2 text-white hover:bg-[#122c35] md:w-auto"
            onClick={handlePasswordChange}
          >
            {labels.updatePassword}
          </button>
          {passwordStatus && <div className="text-sm text-slate-600">{passwordStatus}</div>}
        </div>

        {me?.is_superuser && (
          <div className="space-y-6 rounded-xl border border-slate-200 bg-white p-6">
            <div className="text-lg font-semibold text-[#1c3944]">{labels.subAdmins}</div>

            <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
              <div className="space-y-4">
                <div className="text-sm font-semibold text-slate-500">{labels.currentUsers}</div>
                <div className="space-y-3">
                  {users.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between rounded-lg border border-slate-200 p-3"
                    >
                      <div>
                        <div className="text-sm font-semibold text-[#1c3944]">{user.username}</div>
                        <div className="text-xs text-slate-500">{user.email}</div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          className="text-xs text-slate-600"
                          onClick={() => handleEditUser(user)}
                        >
                          {labels.edit}
                        </button>
                        {!user.is_superuser && (
                          <button
                            type="button"
                            className="text-xs text-red-600"
                            onClick={() => handleDeleteUser(user.id)}
                          >
                            {labels.delete}
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                  {users.length === 0 && <div className="text-sm text-slate-500">{labels.noSubAdmins}</div>}
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-sm font-semibold text-slate-500">
                  {editingUserId ? labels.editPermissions : labels.createAdmin}
                </div>
                {editingUserId ? (
                  <div className="space-y-3">
                    <input
                      className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                      placeholder={labels.email}
                      value={editingUser?.email ?? ""}
                      onChange={(event) =>
                        setEditingUser((prev) => (prev ? { ...prev, email: event.target.value } : prev))
                      }
                    />
                    <input
                      className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                      placeholder={labels.newPasswordOptional}
                      value={editingUser?.password ?? ""}
                      onChange={(event) =>
                        setEditingUser((prev) => (prev ? { ...prev, password: event.target.value } : prev))
                      }
                    />
                    {renderPermissionsEditor("edit", editingUser?.permissions ?? DEFAULT_PERMISSIONS)}
                    <div className="flex gap-3">
                      <button
                        type="button"
                        className="rounded-lg bg-[#1c3944] px-4 py-2 text-white"
                        onClick={handleUpdateUser}
                      >
                        {labels.save}
                      </button>
                      <button
                        type="button"
                        className="rounded-lg border border-slate-300 px-4 py-2 text-slate-600"
                        onClick={() => {
                          setEditingUserId(null);
                          setEditingUser(null);
                        }}
                      >
                        {labels.cancel}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <input
                      className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                      placeholder={labels.username}
                      value={newUser.username}
                      onChange={(event) => setNewUser({ ...newUser, username: event.target.value })}
                    />
                    <input
                      className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                      placeholder={labels.email}
                      value={newUser.email}
                      onChange={(event) => setNewUser({ ...newUser, email: event.target.value })}
                    />
                    <input
                      type="password"
                      className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                      placeholder={labels.password}
                      value={newUser.password}
                      onChange={(event) => setNewUser({ ...newUser, password: event.target.value })}
                    />
                    {renderPermissionsEditor("new", newUser.permissions)}
                    <button
                      type="button"
                      className="rounded-lg bg-[#1c3944] px-4 py-2 text-white"
                      onClick={handleCreateUser}
                      disabled={creating}
                    >
                      {creating ? labels.creating : labels.create}
                    </button>
                  </div>
                )}
                {usersStatus && <div className="text-sm text-slate-600">{usersStatus}</div>}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
