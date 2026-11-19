import { useState } from "react";
import {
  CalendarDays,
  Users,
  IndianRupee,
  ClipboardList,
  Search,
  Eye,
  X,
} from "lucide-react";

export default function BookingManagement() {
  const [bookings] = useState(() =>
    JSON.parse(localStorage.getItem("bookings") || "[]"),
  );

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedBooking, setSelectedBooking] = useState(null);

  // Filter bookings
  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.guestName?.toLowerCase().includes(search.toLowerCase()) ||
      String(booking.bookingId).includes(search);

    const matchesStatus =
      statusFilter === "All" || booking.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Dashboard summary
  const totalBookings = bookings.length;

  const confirmedBookings = bookings.filter(
    (booking) => booking.status === "Confirmed",
  ).length;

  const cancelledBookings = bookings.filter(
    (booking) => booking.status === "Cancelled",
  ).length;

  const totalRevenue = bookings
    .filter((booking) => booking.status === "Confirmed")
    .reduce((total, booking) => total + Number(booking.totalPrice || 0), 0);

  const summaryCards = [
    {
      title: "Total Bookings",
      value: totalBookings,
      icon: ClipboardList,
    },
    {
      title: "Confirmed Bookings",
      value: confirmedBookings,
      icon: CalendarDays,
    },
    {
      title: "Cancelled Bookings",
      value: cancelledBookings,
      icon: Users,
    },
    {
      title: "Total Revenue",
      value: `₹${totalRevenue.toLocaleString("en-IN")}`,
      icon: IndianRupee,
    },
  ];

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Page Header */}
      <section className="bg-slate-950 px-6 lg:px-12 py-14">
        <div className="max-w-[1450px] mx-auto">
          <p className="text-amber-400 text-sm font-semibold tracking-widest mb-3">
            ADMIN PANEL
          </p>

          <h1 className="text-3xl md:text-5xl font-bold text-white">
            Booking Management
          </h1>

          <p className="text-slate-300 mt-4 text-base md:text-lg">
            View and manage all customer reservations.
          </p>
        </div>
      </section>

      <section className="max-w-[1450px] mx-auto px-6 lg:px-12 py-12">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {summaryCards.map((card) => {
            const Icon = card.icon;

            return (
              <div
                key={card.title}
                className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <p className="text-stone-500 text-sm font-medium">
                    {card.title}
                  </p>

                  <div className="bg-amber-100 text-amber-600 p-3 rounded-xl">
                    <Icon size={21} />
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-slate-900 mt-4">
                  {card.value}
                </h2>
              </div>
            );
          })}
        </div>

        {/* Booking List */}
        <div className="mt-10">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-900">
              All Reservations
            </h2>

            <p className="text-stone-500 mt-2">
              Manage customer bookings and reservation details.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="bg-white border border-stone-200 rounded-xl p-4 mb-6 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by guest name or booking ID..."
                className="w-full h-12 pl-11 pr-4 border border-stone-200 rounded-lg outline-none focus:border-amber-500"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-12 px-4 border border-stone-200 rounded-lg bg-white outline-none focus:border-amber-500"
            >
              <option value="All">All Status</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          {/* Bookings Table */}
          {filteredBookings.length > 0 ? (
            <div className="bg-white border border-stone-200 rounded-2xl overflow-x-auto shadow-sm">
              <table className="w-full min-w-[900px] text-left">
                <thead className="bg-slate-900 text-white">
                  <tr>
                    <th className="px-5 py-4 text-sm">Booking ID</th>
                    <th className="px-5 py-4 text-sm">Guest Name</th>
                    <th className="px-5 py-4 text-sm">Room</th>
                    <th className="px-5 py-4 text-sm">Check-in</th>
                    <th className="px-5 py-4 text-sm">Check-out</th>
                    <th className="px-5 py-4 text-sm">Amount</th>
                    <th className="px-5 py-4 text-sm">Status</th>
                    <th className="px-5 py-4 text-sm">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredBookings.map((booking) => (
                    <tr
                      key={booking.bookingId}
                      className="border-b border-stone-100 last:border-0"
                    >
                      <td className="px-5 py-4 text-sm font-medium text-slate-900">
                        #{booking.bookingId}
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-800">
                        {booking.guestName}
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-800">
                        {booking.roomName}
                      </td>

                      <td className="px-5 py-4 text-sm text-stone-600">
                        {booking.checkIn}
                      </td>

                      <td className="px-5 py-4 text-sm text-stone-600">
                        {booking.checkOut}
                      </td>

                      <td className="px-5 py-4 text-sm font-semibold text-slate-900">
                        ₹{Number(booking.totalPrice).toLocaleString("en-IN")}
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                            booking.status === "Confirmed"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {booking.status}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <button
                          onClick={() => setSelectedBooking(booking)}
                          className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-semibold text-sm"
                        >
                          <Eye size={17} />
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="bg-white border border-stone-200 rounded-2xl text-center py-16 px-6">
              <ClipboardList size={42} className="mx-auto text-stone-400" />

              <h3 className="text-xl font-bold text-slate-900 mt-4">
                No Bookings Found
              </h3>

              <p className="text-stone-500 mt-2">
                Try changing your search or status filter.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Booking Details Modal */}
      {selectedBooking && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-5"
          onClick={() => setSelectedBooking(null)}
        >
          <div
            className="bg-white w-full max-w-lg rounded-2xl p-6 md:p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-slate-900">
                Booking Details
              </h2>

              <button
                onClick={() => setSelectedBooking(null)}
                className="text-stone-500 hover:text-slate-900"
                aria-label="Close booking details"
              >
                <X size={22} />
              </button>
            </div>

            <div className="space-y-4 text-sm">
              <p>
                <strong>Booking ID:</strong> #{selectedBooking.bookingId}
              </p>
              <p>
                <strong>Guest Name:</strong> {selectedBooking.guestName}
              </p>
              <p>
                <strong>Email:</strong> {selectedBooking.email}
              </p>
              <p>
                <strong>Phone:</strong> {selectedBooking.phone}
              </p>
              <p>
                <strong>Room:</strong> {selectedBooking.roomName}
              </p>
              <p>
                <strong>Location:</strong> {selectedBooking.location}
              </p>
              <p>
                <strong>Check-in:</strong> {selectedBooking.checkIn}
              </p>
              <p>
                <strong>Check-out:</strong> {selectedBooking.checkOut}
              </p>
              <p>
                <strong>Guests:</strong> {selectedBooking.guests}
              </p>
              <p>
                <strong>Total Amount:</strong> ₹
                {Number(selectedBooking.totalPrice).toLocaleString("en-IN")}
              </p>
              <p>
                <strong>Status:</strong> {selectedBooking.status}
              </p>
            </div>

            <button
              onClick={() => setSelectedBooking(null)}
              className="w-full mt-7 bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-lg font-semibold transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
