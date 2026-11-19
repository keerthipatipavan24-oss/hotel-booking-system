import { Link } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white">
      <div className="max-w-[1450px] mx-auto px-6 lg:px-12 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <h2 className="text-3xl font-bold">
              Stay<span className="text-amber-400">Ease</span>
            </h2>

            <p className="text-slate-400 text-sm leading-relaxed mt-5 max-w-xs">
              Discover comfortable stays, beautiful destinations and memorable
              experiences with StayEase.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-5">Quick Links</h3>

            <div className="flex flex-col gap-3 text-sm text-slate-400">
              <Link to="/" className="hover:text-amber-400 transition">
                Home
              </Link>
              <Link to="/rooms" className="hover:text-amber-400 transition">
                Rooms
              </Link>
              <Link
                to="/my-bookings"
                className="hover:text-amber-400 transition"
              >
                My Bookings
              </Link>
              <Link to="/profile" className="hover:text-amber-400 transition">
                My Profile
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-5">Contact Us</h3>

            <div className="flex flex-col gap-4 text-sm text-slate-400">
              <p className="flex items-center gap-3">
                <MapPin size={18} className="text-amber-400" />
                Hyderabad, India
              </p>

              <p className="flex items-center gap-3">
                <Phone size={18} className="text-amber-400" />
                +91 98765 43210
              </p>

              <p className="flex items-center gap-3">
                <Mail size={18} className="text-amber-400" />
                support@stayease.com
              </p>
            </div>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-5">
              Your Stay, Our Priority
            </h3>

            <p className="text-slate-400 text-sm leading-relaxed">
              We're here to make every journey comfortable, convenient and
              memorable.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 mt-12 pt-6 text-center">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} StayEase. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
