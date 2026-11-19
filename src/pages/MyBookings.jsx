import { useState } from "react";
import { Link } from "react-router-dom";
import {
  CalendarDays,
  MapPin,
  Users,
  ClipboardList,
  X,
  AlertTriangle,
} from "lucide-react";

export default function MyBookings() {
  const [bookings, setBookings] = useState(() =>
    JSON.parse(localStorage.getItem("bookings") || "[]"),
  );

  const [selectedBookingId, setSelectedBookingId] = useState(null);

  // Cancel Booking
  const handleCancel = () => {
    const updatedBookings = bookings.map((booking) =>
      booking.bookingId === selectedBookingId
        ? { ...booking, status: "Cancelled" }
        : booking,
    );

    localStorage.setItem("bookings", JSON.stringify(updatedBookings));
    setBookings(updatedBookings);
    setSelectedBookingId(null);
  };

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Page Header */}
      <section className="bg-slate-950 px-6 lg:px-12 py-14">
        <div className="max-w-[1450px] mx-auto">
          <p className="text-amber-400 font-semibold text-sm tracking-widest mb-3">
            YOUR STAYEASE ACCOUNT
          </p>

          <h1 className="text-3xl md:text-5xl font-bold text-white">
            My Bookings
          </h1>

          <p className="text-slate-300 mt-4 text-base md:text-lg">
            View and manage all your hotel reservations.
          </p>
        </div>
      </section>

      {/* Booking Cards Section */}
      <section className="max-w-[1200px] mx-auto px-6 py-12">
        {/* Keep your existing booking cards and related content here */}

        {/* Booking List */}
        {bookings.length > 0 ? (
          <div className="flex flex-col gap-6">
            {bookings
              .slice()
              .reverse()
              .map((booking) => (
                <div
                  key={booking.bookingId}
                  className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 md:p-8"
                >
                  {/* Room Name and Status */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h2 className="text-xl md:text-2xl font-bold text-slate-900">
                        {booking.roomName}
                      </h2>

                      <p className="text-sm text-stone-500 mt-2">
                        Booking ID: #{booking.bookingId}
                      </p>
                    </div>

                    <span
                      className={`w-fit px-4 py-2 rounded-full text-sm font-semibold ${
                        booking.status === "Confirmed"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>

                  {/* Booking Information */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-7 pt-6 border-t border-stone-100">
                    <div>
                      <p className="text-sm text-stone-500 flex items-center gap-2">
                        <MapPin size={16} />
                        Location
                      </p>
                      <p className="font-semibold text-slate-900 mt-2">
                        {booking.location}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-stone-500 flex items-center gap-2">
                        <CalendarDays size={16} />
                        Check-in
                      </p>
                      <p className="font-semibold text-slate-900 mt-2">
                        {booking.checkIn}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-stone-500 flex items-center gap-2">
                        <CalendarDays size={16} />
                        Check-out
                      </p>
                      <p className="font-semibold text-slate-900 mt-2">
                        {booking.checkOut}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-stone-500 flex items-center gap-2">
                        <Users size={16} />
                        Guests
                      </p>
                      <p className="font-semibold text-slate-900 mt-2">
                        {booking.guests}
                      </p>
                    </div>
                  </div>

                  {/* Price and Cancel Button */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mt-7 pt-6 border-t border-stone-100">
                    <div>
                      <p className="text-sm text-stone-500">
                        Total Booking Amount
                      </p>

                      <p className="text-2xl font-bold text-amber-600 mt-1">
                        ₹{booking.totalPrice.toLocaleString("en-IN")}
                      </p>
                    </div>

                    {booking.status === "Confirmed" && (
                      <button
                        onClick={() => setSelectedBookingId(booking.bookingId)}
                        className="bg-red-50 hover:bg-red-100 text-red-600 px-6 py-3 rounded-lg font-semibold transition"
                      >
                        Cancel Booking
                      </button>
                    )}
                  </div>
                </div>
              ))}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white rounded-2xl border border-stone-200 text-center py-16 px-6">
            <ClipboardList size={48} className="mx-auto text-stone-400" />

            <h2 className="text-2xl font-bold text-slate-900 mt-5">
              No Bookings Yet
            </h2>

            <p className="text-stone-500 mt-3">
              You haven't booked any rooms yet. Explore our rooms and plan your
              stay.
            </p>

            <Link
              to="/rooms"
              className="inline-block mt-6 bg-amber-500 hover:bg-amber-600 text-slate-950 px-6 py-3 rounded-lg font-semibold transition"
            >
              Explore Rooms
            </Link>
          </div>
        )}
      </section>

      {/* Cancellation Confirmation Modal */}
      {selectedBookingId !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-6"
          onClick={() => setSelectedBookingId(null)}
        >
          <div
            className="bg-white w-full max-w-md rounded-2xl p-7 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cancel-modal-title"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedBookingId(null)}
              className="absolute top-4 right-4 text-stone-400 hover:text-slate-900 transition"
              aria-label="Close confirmation"
            >
              <X size={22} />
            </button>

            {/* Modal Icon */}
            <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto">
              <AlertTriangle size={28} className="text-red-600" />
            </div>

            <h2
              id="cancel-modal-title"
              className="text-xl font-bold text-slate-900 text-center mt-5"
            >
              Cancel Booking?
            </h2>

            <p className="text-stone-600 text-sm text-center mt-3 leading-relaxed">
              Are you sure you want to cancel this booking? Your booking status
              will be updated to Cancelled.
            </p>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row gap-3 mt-7">
              <button
                onClick={() => setSelectedBookingId(null)}
                className="flex-1 border border-stone-300 hover:bg-stone-100 text-slate-900 py-3 rounded-lg font-semibold transition"
              >
                Keep Booking
              </button>

              <button
                onClick={handleCancel}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
