import { useState } from "react";
import { User, Mail, Phone, Settings, Save, Edit } from "lucide-react";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState(() => {
    return (
      JSON.parse(localStorage.getItem("userProfile")) || {
        name: "",
        email: "",
        phone: "",
      }
    );
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfile((previous) => ({
      ...previous,
      [name]: value,
    }));

    setMessage("");
  };

  const handleSave = (e) => {
    e.preventDefault();

    if (
      !profile.name.trim() ||
      !profile.email.trim() ||
      !profile.phone.trim()
    ) {
      setMessage("Please fill in all profile details.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email)) {
      setMessage("Please enter a valid email address.");
      return;
    }

    if (!/^[0-9]{10}$/.test(profile.phone)) {
      setMessage("Please enter a valid 10-digit phone number.");
      return;
    }

    localStorage.setItem("userProfile", JSON.stringify(profile));
    setIsEditing(false);
    setMessage("Profile updated successfully!");
  };

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Page Header */}
      <section className="bg-slate-950 px-6 lg:px-12 py-14">
        <div className="max-w-[1200px] mx-auto">
          <p className="text-amber-400 text-sm font-semibold tracking-widest mb-3">
            YOUR STAYEASE ACCOUNT
          </p>

          <h1 className="text-3xl md:text-5xl font-bold text-white">
            My Profile
          </h1>

          <p className="text-slate-300 mt-4">
            Manage your personal information and account settings.
          </p>
        </div>
      </section>

      {/* Profile Section */}
      <section className="max-w-[1200px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-7 text-center h-fit">
            <div className="w-24 h-24 mx-auto rounded-full bg-amber-100 flex items-center justify-center">
              <User size={45} className="text-amber-600" />
            </div>

            <h2 className="text-xl font-bold text-slate-900 mt-5">
              {profile.name || "Your Name"}
            </h2>

            <p className="text-stone-500 text-sm mt-2">StayEase Customer</p>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-stone-200 shadow-sm p-6 md:p-8">
            <div className="flex items-center justify-between gap-4 mb-7">
              <h2 className="text-xl font-bold text-slate-900">
                Personal Information
              </h2>

              {!isEditing && (
                <button
                  onClick={() => {
                    setIsEditing(true);
                    setMessage("");
                  }}
                  className="flex items-center gap-2 text-amber-600 hover:text-amber-700 font-semibold"
                >
                  <Edit size={17} />
                  Edit Profile
                </button>
              )}
            </div>

            <form onSubmit={handleSave}>
              <div className="flex flex-col gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"
                    />
                    <input
                      type="text"
                      name="name"
                      value={profile.name}
                      onChange={handleChange}
                      disabled={!isEditing}
                      placeholder="Enter your full name"
                      className="w-full h-12 pl-11 pr-4 border border-stone-200 rounded-lg outline-none focus:border-amber-500 disabled:bg-stone-50 disabled:text-stone-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"
                    />
                    <input
                      type="email"
                      name="email"
                      value={profile.email}
                      onChange={handleChange}
                      disabled={!isEditing}
                      placeholder="Enter your email address"
                      className="w-full h-12 pl-11 pr-4 border border-stone-200 rounded-lg outline-none focus:border-amber-500 disabled:bg-stone-50 disabled:text-stone-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"
                    />
                    <input
                      type="tel"
                      name="phone"
                      value={profile.phone}
                      onChange={handleChange}
                      disabled={!isEditing}
                      maxLength={10}
                      placeholder="Enter your 10-digit phone number"
                      className="w-full h-12 pl-11 pr-4 border border-stone-200 rounded-lg outline-none focus:border-amber-500 disabled:bg-stone-50 disabled:text-stone-500"
                    />
                  </div>
                </div>
              </div>

              {message && (
                <p
                  className="mt-5 text-sm font-medium text-amber-700"
                  role="status"
                >
                  {message}
                </p>
              )}

              {isEditing && (
                <div className="flex flex-col sm:flex-row gap-3 mt-8">
                  <button
                    type="submit"
                    className="flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 px-6 py-3 rounded-lg font-semibold transition"
                  >
                    <Save size={18} />
                    Save Changes
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setProfile(
                        JSON.parse(localStorage.getItem("userProfile")) || {
                          name: "",
                          email: "",
                          phone: "",
                        },
                      );
                      setIsEditing(false);
                      setMessage("");
                    }}
                    className="border border-stone-300 hover:bg-stone-100 px-6 py-3 rounded-lg font-semibold transition"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Account Settings */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 md:p-8 mt-8">
          <div className="flex items-center gap-3 mb-4">
            <Settings className="text-amber-600" size={22} />
            <h2 className="text-xl font-bold text-slate-900">
              Account Settings
            </h2>
          </div>

          <p className="text-stone-500 text-sm">
            Your profile information is saved in this browser using
            localStorage.
          </p>
        </div>
      </section>
    </div>
  );
}
