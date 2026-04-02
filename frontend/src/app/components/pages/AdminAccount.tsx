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
} from "../../utils/api";

const DEFAULT_PERMISSIONS = {
  content: { view: true, edit: true, delete: false },
  news: { view: true, edit: true, delete: false },
  jobs: { view: true, edit: true, delete: false },
  team: { view: true, edit: true, delete: false },
  publications: { view: true, edit: true, delete: false },
  events: { view: true, edit: true, delete: false },
  memory: { view: true, edit: true, delete: false },
  archive: { view: true, edit: true, delete: false },
};

export default function AdminAccount({ lang }) {
  const isRTL = lang === "ar";
  const [token, setToken] = useState(() => window.localStorage.getItem("rs_admin_token") ?? "");
  const [status, setStatus] = useState("");
  const [me, setMe] = useState<any>(null);
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordStatus, setPasswordStatus] = useState("");
  const [users, setUsers] = useState<any[]>([]);
  const [usersStatus, setUsersStatus] = useState("");
  const [creating, setCreating] = useState(false);
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
    permissions: { ...DEFAULT_PERMISSIONS },
  });
  const [editingUserId, setEditingUserId] = useState<number | null>(null);
  const [editingUser, setEditingUser] = useState<any>(null);

  const permissionsKeys = useMemo(
    () => Object.keys(DEFAULT_PERMISSIONS),
    [],
  );

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
      setStatus(isRTL ? "أدخل بيانات الدخول." : "Enter credentials.");
      return;
    }
    loginAdmin(credentials.username, credentials.password)
      .then((response) => {
        window.localStorage.setItem("rs_admin_token", response.token);
        setToken(response.token);
        setStatus(isRTL ? "تم تسجيل الدخول." : "Logged in.");
      })
      .catch(() => {
        setStatus(isRTL ? "فشل تسجيل الدخول." : "Login failed.");
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
      setPasswordStatus(isRTL ? "يرجى تعبئة جميع الحقول." : "Please fill in all fields.");
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordStatus(isRTL ? "كلمتا المرور غير متطابقتين." : "Passwords do not match.");
      return;
    }
    changeAdminPassword(token, passwordForm.currentPassword, passwordForm.newPassword)
      .then((response) => {
        setPasswordStatus(response?.detail ?? (isRTL ? "تم تحديث كلمة المرور." : "Password updated."));
        setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
      })
      .catch((error) => {
        const message =
          error?.detail?.[0] ??
          error?.detail ??
          (isRTL ? "فشل تحديث كلمة المرور." : "Password update failed.");
        setPasswordStatus(Array.isArray(message) ? message[0] : message);
      });
  };

  const handleCreateUser = () => {
    if (!token) return;
    if (!newUser.username || !newUser.password) {
      setUsersStatus(isRTL ? "أدخل اسم المستخدم وكلمة المرور." : "Username and password are required.");
      return;
    }
    setCreating(true);
    createAdminUser(token, newUser)
      .then(() => {
        setUsersStatus(isRTL ? "تم إنشاء المستخدم." : "User created.");
        setNewUser({ username: "", email: "", password: "", permissions: { ...DEFAULT_PERMISSIONS } });
        loadUsers();
      })
      .catch((error) => {
        const message = error?.detail ?? (isRTL ? "فشل إنشاء المستخدم." : "Failed to create user.");
        setUsersStatus(message);
      })
      .finally(() => setCreating(false));
  };

  const handleEditUser = (user: any) => {
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
        setUsersStatus(isRTL ? "تم تحديث المستخدم." : "User updated.");
        setEditingUserId(null);
        setEditingUser(null);
        loadUsers();
      })
      .catch((error) => {
        const message = error?.detail ?? (isRTL ? "فشل التحديث." : "Update failed.");
        setUsersStatus(message);
      });
  };

  const handleDeleteUser = (userId: number) => {
    if (!token) return;
    deleteAdminUser(token, userId)
      .then(() => {
        setUsersStatus(isRTL ? "تم الحذف." : "Deleted.");
        loadUsers();
      })
      .catch((error) => {
        const message = error?.detail ?? (isRTL ? "فشل الحذف." : "Delete failed.");
        setUsersStatus(message);
      });
  };

  if (!token) {
    return (
      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="max-w-md mx-auto px-6 lg:px-8">
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-[#1c3944] mb-4">
              {isRTL ? "تسجيل الدخول إلى لوحة التحكم" : "Sign in to Admin"}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-slate-600 mb-1">
                  {isRTL ? "اسم المستخدم" : "Username"}
                </label>
                <input
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                  value={credentials.username}
                  onChange={(event) => setCredentials({ ...credentials, username: event.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm text-slate-600 mb-1">
                  {isRTL ? "كلمة المرور" : "Password"}
                </label>
                <input
                  type="password"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                  value={credentials.password}
                  onChange={(event) => setCredentials({ ...credentials, password: event.target.value })}
                />
              </div>
              <button
                type="button"
                className="w-full rounded-lg bg-[#1c3944] text-white px-4 py-2 hover:bg-[#122c35]"
                onClick={handleLogin}
              >
                {isRTL ? "تسجيل الدخول" : "Login"}
              </button>
              {status && <div className="text-sm text-slate-600">{status}</div>}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 lg:py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl lg:text-4xl font-semibold text-[#1c3944]">
              {isRTL ? "حساب الإدارة" : "Admin Account"}
            </h1>
            <p className="text-slate-600">
              {isRTL ? "إدارة كلمة المرور وصلاحيات المشرفين." : "Manage passwords and admin permissions."}
            </p>
          </div>
          <div className="flex gap-3">
            <Link href="/admin">
              <span className="text-sm text-[#1c3944] font-semibold cursor-pointer">
                {isRTL ? "لوحة التحكم" : "Dashboard"}
              </span>
            </Link>
            <button
              type="button"
              className="text-sm text-slate-600"
              onClick={handleLogout}
            >
              {isRTL ? "تسجيل الخروج" : "Logout"}
            </button>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
          <div className="text-lg font-semibold text-[#1c3944]">
            {isRTL ? "تغيير كلمة المرور" : "Change Password"}
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-500">
                {isRTL ? "كلمة المرور الحالية" : "Current Password"}
              </label>
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
              <label className="block text-xs font-semibold text-slate-500">
                {isRTL ? "كلمة المرور الجديدة" : "New Password"}
              </label>
              <input
                type="password"
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                value={passwordForm.newPassword}
                onChange={(event) =>
                  setPasswordForm({ ...passwordForm, newPassword: event.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-500">
                {isRTL ? "تأكيد كلمة المرور" : "Confirm Password"}
              </label>
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
            className="w-full md:w-auto rounded-lg bg-[#1c3944] text-white px-4 py-2 hover:bg-[#122c35]"
            onClick={handlePasswordChange}
          >
            {isRTL ? "تحديث كلمة المرور" : "Update Password"}
          </button>
          {passwordStatus && <div className="text-sm text-slate-600">{passwordStatus}</div>}
        </div>

        {me?.is_superuser && (
          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-6">
            <div className="text-lg font-semibold text-[#1c3944]">
              {isRTL ? "إدارة المشرفين الفرعيين" : "Sub Admins"}
            </div>

            <div className="grid lg:grid-cols-[1fr_1fr] gap-6">
              <div className="space-y-4">
                <div className="text-sm font-semibold text-slate-500">
                  {isRTL ? "المستخدمون الحاليون" : "Current Users"}
                </div>
                <div className="space-y-3">
                  {users.map((user) => (
                    <div key={user.id} className="border border-slate-200 rounded-lg p-3 flex items-center justify-between">
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
                          {isRTL ? "تعديل" : "Edit"}
                        </button>
                        {!user.is_superuser && (
                          <button
                            type="button"
                            className="text-xs text-red-600"
                            onClick={() => handleDeleteUser(user.id)}
                          >
                            {isRTL ? "حذف" : "Delete"}
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                  {users.length === 0 && (
                    <div className="text-sm text-slate-500">
                      {isRTL ? "لا يوجد مشرفون بعد." : "No sub admins yet."}
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-sm font-semibold text-slate-500">
                  {editingUserId ? (isRTL ? "تعديل الصلاحيات" : "Edit Permissions") : (isRTL ? "إضافة مشرف" : "Create Admin")}
                </div>
                {editingUserId ? (
                  <div className="space-y-3">
                    <input
                      className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                      placeholder={isRTL ? "البريد الإلكتروني" : "Email"}
                      value={editingUser?.email ?? ""}
                      onChange={(event) => setEditingUser({ ...editingUser, email: event.target.value })}
                    />
                    <input
                      className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                      placeholder={isRTL ? "كلمة مرور جديدة (اختياري)" : "New Password (optional)"}
                      value={editingUser?.password ?? ""}
                      onChange={(event) => setEditingUser({ ...editingUser, password: event.target.value })}
                    />
                    <div className="space-y-2">
                      {permissionsKeys.map((key) => (
                        <div key={key} className="border border-slate-200 rounded-lg p-3">
                          <div className="text-sm font-semibold text-[#1c3944] mb-2">{key}</div>
                          <div className="flex flex-wrap gap-4 text-sm">
                            {["view", "edit", "delete"].map((action) => (
                              <label key={action} className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  checked={Boolean(editingUser?.permissions?.[key]?.[action])}
                                  onChange={(event) =>
                                    setEditingUser({
                                      ...editingUser,
                                      permissions: {
                                        ...editingUser.permissions,
                                        [key]: {
                                          ...editingUser.permissions?.[key],
                                          [action]: event.target.checked,
                                        },
                                      },
                                    })
                                  }
                                />
                                {action}
                              </label>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-3">
                      <button
                        type="button"
                        className="rounded-lg bg-[#1c3944] text-white px-4 py-2"
                        onClick={handleUpdateUser}
                      >
                        {isRTL ? "حفظ" : "Save"}
                      </button>
                      <button
                        type="button"
                        className="rounded-lg border border-slate-300 px-4 py-2 text-slate-600"
                        onClick={() => {
                          setEditingUserId(null);
                          setEditingUser(null);
                        }}
                      >
                        {isRTL ? "إلغاء" : "Cancel"}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <input
                      className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                      placeholder={isRTL ? "اسم المستخدم" : "Username"}
                      value={newUser.username}
                      onChange={(event) => setNewUser({ ...newUser, username: event.target.value })}
                    />
                    <input
                      className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                      placeholder={isRTL ? "البريد الإلكتروني" : "Email"}
                      value={newUser.email}
                      onChange={(event) => setNewUser({ ...newUser, email: event.target.value })}
                    />
                    <input
                      type="password"
                      className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                      placeholder={isRTL ? "كلمة المرور" : "Password"}
                      value={newUser.password}
                      onChange={(event) => setNewUser({ ...newUser, password: event.target.value })}
                    />
                    <div className="space-y-2">
                      {permissionsKeys.map((key) => (
                        <div key={key} className="border border-slate-200 rounded-lg p-3">
                          <div className="text-sm font-semibold text-[#1c3944] mb-2">{key}</div>
                          <div className="flex flex-wrap gap-4 text-sm">
                            {["view", "edit", "delete"].map((action) => (
                              <label key={action} className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  checked={Boolean(newUser.permissions?.[key]?.[action])}
                                  onChange={(event) =>
                                    setNewUser({
                                      ...newUser,
                                      permissions: {
                                        ...newUser.permissions,
                                        [key]: {
                                          ...newUser.permissions?.[key],
                                          [action]: event.target.checked,
                                        },
                                      },
                                    })
                                  }
                                />
                                {action}
                              </label>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    <button
                      type="button"
                      className="rounded-lg bg-[#1c3944] text-white px-4 py-2"
                      onClick={handleCreateUser}
                      disabled={creating}
                    >
                      {creating ? (isRTL ? "جارٍ الإنشاء..." : "Creating...") : isRTL ? "إضافة مشرف" : "Create"}
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
