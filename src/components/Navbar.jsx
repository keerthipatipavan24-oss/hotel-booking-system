import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Rooms", path: "/rooms" },
    { name: "My Bookings", path: "/my-bookings" },
    { name: "Profile", path: "/profile" },
  ];

  const adminLinks = [
    { name: "Room Management", path: "/admin" },
    { name: "Booking Management", path: "/booking-management" },
  ];

  const linkStyle = ({ isActive }) =>
    `font-medium transition duration-200 ${
      isActive ? "text-amber-400" : "text-slate-200 hover:text-amber-400"
    }`;

  return (
    <nav className="bg-slate-900 shadow-md relative z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="h-20 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-3xl font-bold text-white">
            Stay<span className="text-amber-400">Ease</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink key={link.path} to={link.path} className={linkStyle}>
                {link.name}
              </NavLink>
            ))}

            {/* Admin Dropdown */}
            <div className="relative">
              <button
                onClick={() => setAdminOpen(!adminOpen)}
                className={`flex items-center gap-1 font-medium transition duration-200 ${
                  adminLinks.some(
                    (link) => window.location.pathname === link.path,
                  )
                    ? "text-amber-400"
                    : "text-slate-200 hover:text-amber-400"
                }`}
              >
                Admin
                <ChevronDown
                  size={17}
                  className={`transition-transform duration-200 ${
                    adminOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {adminOpen && (
                <div className="absolute right-0 top-full mt-3 w-56 bg-white rounded-xl shadow-xl border border-stone-200 py-2">
                  {adminLinks.map((link) => (
                    <NavLink
                      key={link.path}
                      to={link.path}
                      onClick={() => setAdminOpen(false)}
                      className={({ isActive }) =>
                        `block px-5 py-3 text-sm font-medium transition ${
                          isActive
                            ? "bg-amber-50 text-amber-600"
                            : "text-slate-700 hover:bg-stone-100"
                        }`
                      }
                    >
                      {link.name}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white"
            aria-label="Toggle navigation menu"
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <div className="md:hidden flex flex-col gap-5 pb-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={linkStyle}
              >
                {link.name}
              </NavLink>
            ))}

            {/* Mobile Admin Dropdown */}
            <button
              onClick={() => setAdminOpen(!adminOpen)}
              className="flex items-center justify-between text-slate-200 hover:text-amber-400 font-medium"
            >
              Admin
              <ChevronDown
                size={18}
                className={`transition-transform ${
                  adminOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {adminOpen && (
              <div className="flex flex-col gap-4 pl-5">
                {adminLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    onClick={() => {
                      setMenuOpen(false);
                      setAdminOpen(false);
                    }}
                    className={linkStyle}
                  >
                    {link.name}
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
