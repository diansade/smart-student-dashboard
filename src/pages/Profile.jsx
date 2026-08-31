import { useEffect, useState } from "react";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) {
    return (
      <div className="p-6">
        <p>User information not found.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Profile</h1>

        <p className="text-gray-500 mb-8">Manage your account information</p>

        <div className="bg-white rounded-2xl border p-8">
          <div className="flex items-center gap-5 mb-8">
            <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center text-3xl font-semibold text-emerald-700">
              {user.name.charAt(0).toUpperCase()}
            </div>

            <div>
              <h2 className="text-2xl font-semibold">{user.name}</h2>

              <p className="text-gray-500">{user.email}</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-sm text-gray-500">Name</p>

              <p className="text-lg font-medium">{user.name}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Email</p>

              <p className="text-lg font-medium">{user.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
