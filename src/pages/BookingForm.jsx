import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CalendarDays, Users, MapPin } from "lucide-react";

const rooms = [
  {
    id: 1,
    name: "Deluxe Ocean View Room",
    location: "Hyderabad",
    price: 3500,
    capacity: 2,
  },
  {
    id: 2,
    name: "Luxury King Suite",
    location: "Bengaluru",
    price: 5500,
    capacity: 4,
  },
  {
    id: 3,
    name: "Premium Comfort Room",
    location: "Chennai",
    price: 4200,
    capacity: 3,
  },
  {
    id: 4,
    name: "Executive Business Room",
    location: "Hyderabad",
    price: 3000,
    capacity: 2,
  },
  {
    id: 5,
    name: "Family Garden Suite",
    location: "Bengaluru",
    price: 6500,
    capacity: 6,
  },
  {
    id: 6,
    name: "Classic Comfort Room",
    location: "Vijayawada",
    price: 2200,
    capacity: 2,
  },
  {
    id: 7,
    name: "Royal Premium Suite",
    location: "Chennai",
    price: 7000,
    capacity: 4,
  },
  {
    id: 8,
    name: "Elegant Standard Room",
    location: "Hyderabad",
    price: 2500,
    capacity: 2,
  },
];

export default function BookingForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const room = rooms.find((item) => item.id === Number(id));

  const today = new Date();

  const todayString = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

  const [formData, setFormData] = useState({
    guestName: "",
    email: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    guests: "1",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Individual field validation
  const validateField = (name, value, data = formData) => {
    switch (name) {
      case "guestName":
        if (!value.trim()) return "Full name is required.";
        if (value.trim().length < 3)
          return "Name must contain at least 3 characters.";
        return "";

      case "email":
        if (!value.trim()) return "Email address is required.";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()))
          return "Please enter a valid email address.";
        return "";

      case "phone":
        if (!value.trim()) return "Phone number is required.";
        if (!/^[0-9]{10}$/.test(value))
          return "Enter a valid 10-digit phone number.";
        return "";

      case "checkIn":
        if (!value) return "Check-in date is required.";
        if (value < todayString) return "Check-in date cannot be in the past.";
        return "";

      case "checkOut":
        if (!value) return "Check-out date is required.";
        if (!data.checkIn) return "Please select check-in date first.";
        if (value <= data.checkIn) return "Check-out must be after check-in.";
        return "";

      case "guests":
        if (!value || Number(value) < 1 || Number(value) > room.capacity)
          return `Select between 1 and ${room.capacity} guests.`;
        return "";

      default:
        return "";
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name } = e.target;
    let { value } = e.target;

    if (name === "phone") {
      value = value.replace(/\D/g, "").slice(0, 10);
    }

    const updatedData = {
      ...formData,
      [name]: value,
    };

    setFormData(updatedData);

    if (touched[name]) {
      setErrors((previous) => ({
        ...previous,
        [name]: validateField(name, value, updatedData),
      }));
    }

    // Revalidate check-out when check-in changes
    if (name === "checkIn" && touched.checkOut) {
      setErrors((previous) => ({
        ...previous,
        checkOut: validateField("checkOut", updatedData.checkOut, updatedData),
      }));
    }
  };

  // Validate field when user leaves it
  const handleBlur = (e) => {
    const { name, value } = e.target;

    setTouched((previous) => ({
      ...previous,
      [name]: true,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: validateField(name, value),
    }));
  };

  // Input styling based on validation
  const inputClass = (name) =>
    `w-full h-12 px-4 border rounded-lg outline-none transition ${
      errors[name]
        ? "border-red-500 focus:ring-2 focus:ring-red-100"
        : "border-stone-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
    }`;

  // Calculate booking duration
  const calculateDays = () => {
    if (!formData.checkIn || !formData.checkOut) return 0;

    const start = new Date(formData.checkIn + "T00:00:00");
    const end = new Date(formData.checkOut + "T00:00:00");

    return Math.round((end - start) / (1000 * 60 * 60 * 24));
  };

  const days = calculateDays();
  const totalPrice = room && days > 0 ? days * room.price : 0;

  // Submit booking
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!room) return;

    const newErrors = {};

    Object.keys(formData).forEach((field) => {
      newErrors[field] = validateField(field, formData[field], formData);
    });

    setErrors(newErrors);

    const allTouched = {};
    Object.keys(formData).forEach((field) => {
      allTouched[field] = true;
    });

    setTouched(allTouched);

    if (Object.values(newErrors).some((error) => error !== "")) {
      return;
    }

    const booking = {
      bookingId: Date.now(),
      roomId: room.id,
      roomName: room.name,
      location: room.location,
      pricePerDay: room.price,
      guestName: formData.guestName.trim(),
      email: formData.email.trim(),
      phone: formData.phone,
      checkIn: formData.checkIn,
      checkOut: formData.checkOut,
      guests: Number(formData.guests),
      duration: days,
      totalPrice,
      status: "Confirmed",
      bookedAt: new Date().toISOString(),
    };

    const existingBookings = JSON.parse(
      localStorage.getItem("bookings") || "[]",
    );

    localStorage.setItem(
      "bookings",
      JSON.stringify([...existingBookings, booking]),
    );

    navigate("/booking-confirmation", {
      state: { booking },
    });
  };

  if (!room) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-6">
        <h2 className="text-3xl font-bold text-slate-900">Room Not Found</h2>

        <button
          onClick={() => navigate("/rooms")}
          className="bg-amber-500 px-6 py-3 rounded-lg font-semibold"
        >
          Back to Rooms
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 px-6 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Page Heading */}
        <div className="mb-8">
          <p className="text-amber-600 font-semibold text-sm tracking-widest">
            COMPLETE YOUR RESERVATION
          </p>

          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mt-3">
            Book Your Stay
          </h1>

          <p className="text-stone-600 mt-3">
            Enter your details to confirm your hotel booking.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <form
            onSubmit={handleSubmit}
            noValidate
            className="lg:col-span-2 bg-white rounded-2xl border border-stone-200 shadow-sm p-6 md:p-8"
          >
            <h2 className="text-xl font-bold text-slate-900 mb-6">
              Guest Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Full Name */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold mb-2">
                  Full Name
                </label>

                <input
                  type="text"
                  name="guestName"
                  value={formData.guestName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter your full name"
                  className={inputClass("guestName")}
                />

                {errors.guestName && (
                  <p className="text-red-600 text-xs mt-2" role="alert">
                    {errors.guestName}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter your email"
                  className={inputClass("email")}
                />

                {errors.email && (
                  <p className="text-red-600 text-xs mt-2" role="alert">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Phone Number
                </label>

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="10-digit mobile number"
                  maxLength={10}
                  className={inputClass("phone")}
                />

                {errors.phone && (
                  <p className="text-red-600 text-xs mt-2" role="alert">
                    {errors.phone}
                  </p>
                )}
              </div>

              {/* Check-in */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Check-in Date
                </label>

                <input
                  type="date"
                  name="checkIn"
                  min={todayString}
                  value={formData.checkIn}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={inputClass("checkIn")}
                />

                {errors.checkIn && (
                  <p className="text-red-600 text-xs mt-2" role="alert">
                    {errors.checkIn}
                  </p>
                )}
              </div>

              {/* Check-out */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Check-out Date
                </label>

                <input
                  type="date"
                  name="checkOut"
                  min={formData.checkIn || todayString}
                  value={formData.checkOut}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={inputClass("checkOut")}
                />

                {errors.checkOut && (
                  <p className="text-red-600 text-xs mt-2" role="alert">
                    {errors.checkOut}
                  </p>
                )}
              </div>

              {/* Guests */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Number of Guests
                </label>

                <select
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={inputClass("guests")}
                >
                  {Array.from(
                    { length: room.capacity },
                    (_, index) => index + 1,
                  ).map((count) => (
                    <option key={count} value={count}>
                      {count} {count === 1 ? "Guest" : "Guests"}
                    </option>
                  ))}
                </select>

                {errors.guests && (
                  <p className="text-red-600 text-xs mt-2" role="alert">
                    {errors.guests}
                  </p>
                )}
              </div>
            </div>

            {/* Confirm Booking */}
            <button
              type="submit"
              className="w-full mt-8 bg-amber-500 hover:bg-amber-600 text-slate-950 py-3.5 rounded-lg font-bold transition"
            >
              Confirm Booking
            </button>
          </form>

          {/* Booking Summary */}
          <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 h-fit">
            <h2 className="text-xl font-bold text-slate-900 mb-5">
              Booking Summary
            </h2>

            <h3 className="text-lg font-bold text-slate-900">{room.name}</h3>

            <p className="flex items-center gap-2 text-stone-500 mt-2">
              <MapPin size={16} />
              {room.location}
            </p>

            <div className="border-t border-stone-200 mt-6 pt-5 space-y-4">
              <p className="flex justify-between text-sm">
                <span className="text-stone-500">Price per day</span>
                <span className="font-semibold">
                  ₹{room.price.toLocaleString("en-IN")}
                </span>
              </p>

              <p className="flex justify-between text-sm">
                <span className="text-stone-500 flex items-center gap-2">
                  <CalendarDays size={16} />
                  Duration
                </span>

                <span className="font-semibold">
                  {days > 0
                    ? `${days} ${days === 1 ? "Day" : "Days"}`
                    : "0 Days"}
                </span>
              </p>

              <p className="flex justify-between text-sm">
                <span className="text-stone-500 flex items-center gap-2">
                  <Users size={16} />
                  Guests
                </span>

                <span className="font-semibold">{formData.guests}</span>
              </p>
            </div>

            <div className="border-t border-stone-200 mt-6 pt-5 flex justify-between items-center">
              <span className="font-bold text-slate-900">Total Price</span>

              <span className="text-2xl font-bold text-amber-600">
                ₹{totalPrice.toLocaleString("en-IN")}
              </span>
            </div>

            <p className="text-xs text-stone-500 mt-2">
              Total price is calculated based on the selected duration.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
