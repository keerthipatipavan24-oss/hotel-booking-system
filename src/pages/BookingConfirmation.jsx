import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle, CalendarDays, Users, MapPin, Ticket } from "lucide-react";

export default function BookingConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();

  // Get booking from navigation state or localStorage after refresh
  const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");

  const booking = location.state?.booking || bookings[bookings.length - 1];

  if (!booking) {
    return (
      <div className="min-h-[65vh] flex flex-col items-center justify-center px-6 text-center">
        <h2 className="text-2xl font-bold text-slate-900">No Booking Found</h2>
        <p className="text-stone-500 mt-3">
          Please make a booking to view its confirmation.
        </p>
        <button
          onClick={() => navigate("/rooms")}
          className="mt-6 bg-amber-500 hover:bg-amber-600 px-6 py-3 rounded-lg font-semibold transition"
        >
          Explore Rooms
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 px-6 py-14">
      <div className="max-w-3xl mx-auto">
        {/* Success Message */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-8 md:p-12 text-center">
          <CheckCircle size={72} className="mx-auto text-green-500" />

          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mt-6">
            Booking Confirmed!
          </h1>

          <p className="text-stone-600 mt-3 leading-relaxed">
            Thank you for choosing StayEase. Your room booking has been
            successfully confirmed.
          </p>

          <div className="bg-green-50 border border-green-200 rounded-xl p-4 mt-8">
            <p className="text-sm text-green-700 font-medium">
              Your Booking ID
            </p>
            <p className="text-xl font-bold text-green-800 mt-1">
              #{booking.bookingId}
            </p>
          </div>

          {/* Booking Details */}
          <div className="text-left mt-8">
            <h2 className="text-xl font-bold text-slate-900 mb-5">
              Booking Details
            </h2>

            <div className="border border-stone-200 rounded-xl p-5 space-y-5">
              <div>
                <p className="text-sm text-stone-500">Room</p>
                <p className="font-semibold text-slate-900 mt-1">
                  {booking.roomName}
                </p>
              </div>

              <div>
                <p className="text-sm text-stone-500 flex items-center gap-2">
                  <MapPin size={16} />
                  Location
                </p>
                <p className="font-semibold text-slate-900 mt-1">
                  {booking.location}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <p className="text-sm text-stone-500 flex items-center gap-2">
                    <CalendarDays size={16} />
                    Check-in
                  </p>
                  <p className="font-semibold text-slate-900 mt-1">
                    {booking.checkIn}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-stone-500 flex items-center gap-2">
                    <CalendarDays size={16} />
                    Check-out
                  </p>
                  <p className="font-semibold text-slate-900 mt-1">
                    {booking.checkOut}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <p className="text-sm text-stone-500 flex items-center gap-2">
                    <Users size={16} />
                    Guests
                  </p>
                  <p className="font-semibold text-slate-900 mt-1">
                    {booking.guests}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-stone-500">Duration</p>
                  <p className="font-semibold text-slate-900 mt-1">
                    {booking.duration} Days
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm text-stone-500">Guest Name</p>
                <p className="font-semibold text-slate-900 mt-1">
                  {booking.guestName}
                </p>
              </div>

              <div>
                <p className="text-sm text-stone-500">Email Address</p>
                <p className="font-semibold text-slate-900 mt-1 break-all">
                  {booking.email}
                </p>
              </div>

              <div className="border-t border-stone-200 pt-5 flex justify-between items-center">
                <span className="font-bold text-slate-900">Total Amount</span>
                <span className="text-2xl font-bold text-amber-600">
                  ₹{booking.totalPrice.toLocaleString("en-IN")}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-stone-500">Booking Status</span>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                  {booking.status}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <button
              onClick={() => navigate("/my-bookings")}
              className="flex-1 bg-amber-500 hover:bg-amber-600 text-slate-950 py-3.5 rounded-lg font-semibold transition"
            >
              View My Bookings
            </button>

            <button
              onClick={() => navigate("/rooms")}
              className="flex-1 border border-stone-300 hover:bg-stone-100 text-slate-900 py-3.5 rounded-lg font-semibold transition"
            >
              Explore More Rooms
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
