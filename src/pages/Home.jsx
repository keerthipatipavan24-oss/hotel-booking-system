import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2");
  const [error, setError] = useState("");

  const today = new Date();
  const todayString = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

  const handleSearch = (e) => {
    e.preventDefault();
    setError("");

    if (!destination.trim()) {
      setError("Please enter a destination.");
      return;
    }

    if (!checkIn || !checkOut) {
      setError("Please select both check-in and check-out dates.");
      return;
    }

    if (checkIn < todayString) {
      setError("Check-in date cannot be in the past.");
      return;
    }

    if (checkOut <= checkIn) {
      setError("Check-out date must be after check-in date.");
      return;
    }

    if (Number(guests) < 1 || Number(guests) > 6) {
      setError("Please select a valid number of guests.");
      return;
    }

    navigate(
      `/rooms?destination=${encodeURIComponent(
        destination.trim(),
      )}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`,
    );
  };

  const featuredRooms = [
    {
      id: 1,
      name: "Deluxe Ocean View Room",
      type: "Deluxe Room",
      price: 3500,
      image:
        "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800",
      description: "Enjoy beautiful views and a relaxing luxury stay.",
    },
    {
      id: 2,
      name: "Luxury King Suite",
      type: "Luxury Suite",
      price: 5500,
      image:
        "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800",
      description: "Experience spacious comfort with premium amenities.",
    },
    {
      id: 3,
      name: "Premium Comfort Room",
      type: "Premium Room",
      price: 4200,
      image:
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800",
      description: "A comfortable room designed for a peaceful getaway.",
    },
    {
      id: 4,
      name: "Executive Garden Suite",
      type: "Executive Suite",
      price: 4800,
      image:
        "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800",
      description:
        "Relax in an elegant suite with beautiful interiors and modern comforts.",
    },
  ];

  return (
    <div className="bg-white">
      {/* Section 1 - Hero */}
      <section
        className="relative min-h-[580px] md:min-h-[680px] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1920&q=85')",
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-slate-950/65"></div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <p className="text-amber-400 font-bold tracking-[4px] text-sm md:text-base mb-6">
            WELCOME TO STAYEASE
          </p>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white leading-tight">
            Find Your Perfect Stay
            <span className="block text-amber-400 mt-3">
              Experience Comfort & Luxury
            </span>
          </h1>

          <p className="max-w-3xl mx-auto mt-8 text-white text-base md:text-lg leading-relaxed">
            Discover beautiful destinations, exceptional hospitality and
            comfortable stays for every journey.
          </p>
        </div>
      </section>

      {/* Section 2 - Hotel Search */}
      <section className="bg-stone-50 px-6 lg:px-12 pt-16 md:pt-20 pb-6 md:pb-8">
        <div className="max-w-[1450px] mx-auto bg-white rounded-2xl shadow-md border border-stone-200 p-7 md:p-12">
          {/* Search Heading */}
          <div className="flex flex-col gap-3 mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              Find Your Perfect Stay
            </h2>

            <p className="text-stone-600 text-base md:text-lg">
              Search for hotels and plan your next comfortable stay.
            </p>
          </div>

          {/* Search Form */}
          <form
            onSubmit={handleSearch}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5"
          >
            {/* Destination */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-800">
                Destination
              </label>

              <input
                type="text"
                placeholder="Enter city or destination"
                value={destination}
                onChange={(e) => {
                  setDestination(e.target.value);
                  setError("");
                }}
                className="w-full h-14 px-4 border border-stone-200 rounded-xl outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition"
              />
            </div>

            {/* Check-in */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-800">
                Check-in
              </label>

              <input
                type="date"
                min={todayString}
                value={checkIn}
                onChange={(e) => {
                  setCheckIn(e.target.value);
                  setError("");

                  if (checkOut && e.target.value >= checkOut) {
                    setCheckOut("");
                  }
                }}
                className="w-full h-14 px-4 border border-stone-200 rounded-xl outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition"
              />
            </div>

            {/* Check-out */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-800">
                Check-out
              </label>

              <input
                type="date"
                min={checkIn || todayString}
                value={checkOut}
                onChange={(e) => {
                  setCheckOut(e.target.value);
                  setError("");
                }}
                className="w-full h-14 px-4 border border-stone-200 rounded-xl outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition"
              />
            </div>

            {/* Guests */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-800">
                Guests
              </label>

              <select
                value={guests}
                onChange={(e) => {
                  setGuests(e.target.value);
                  setError("");
                }}
                className="w-full h-14 px-4 border border-stone-200 rounded-xl bg-white outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition cursor-pointer"
              >
                <option value="1">1 Guest</option>
                <option value="2">2 Guests</option>
                <option value="3">3 Guests</option>
                <option value="4">4 Guests</option>
                <option value="5">5 Guests</option>
                <option value="6">6 Guests</option>
              </select>
            </div>

            {/* Search Button */}
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full h-14 bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold rounded-xl transition duration-300"
              >
                Search Hotels
              </button>
            </div>
          </form>

          {/* Validation Message */}
          {error && (
            <p className="mt-5 text-sm text-red-600 font-medium" role="alert">
              {error}
            </p>
          )}
        </div>
      </section>
      {/* Section 3 - Featured Rooms */}
      <section className="bg-stone-50 pt-8 md:pt-10 pb-20 px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          {/* Section Heading */}
          <div className="text-center mb-12">
            <p className="text-amber-600 font-semibold text-sm tracking-widest mb-3">
              COMFORT MEETS LUXURY
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Explore Our Featured Rooms
            </h2>

            <p className="text-stone-600 text-base md:text-lg">
              Discover thoughtfully designed rooms for a comfortable stay.
            </p>
          </div>

          {/* Room Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {featuredRooms.map((room) => (
              <div
                key={room.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out"
              >
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-60 object-cover"
                />

                <div className="p-6">
                  <span className="text-amber-600 text-sm font-semibold">
                    {room.type}
                  </span>

                  <h3 className="text-xl font-bold text-slate-900 mt-2">
                    {room.name}
                  </h3>

                  <p className="text-stone-600 text-sm mt-3 leading-relaxed">
                    {room.description}
                  </p>

                  <div className="flex items-center justify-between border-t border-stone-100 mt-6 pt-5">
                    <div>
                      <p className="text-xs text-stone-500">Starting from</p>
                      <p className="text-xl font-bold text-amber-600">
                        ₹{room.price.toLocaleString("en-IN")}
                        <span className="text-sm font-normal text-stone-500">
                          {" "}
                          / day
                        </span>
                      </p>
                    </div>

                    <Link
                      to={`/rooms/${room.id}`}
                      className="bg-slate-900 hover:bg-amber-500 hover:text-slate-900 text-white px-5 py-3 rounded-lg text-sm font-semibold transition"
                    >
                      View Room
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View All Rooms */}
          <div className="text-center mt-12">
            <Link
              to="/rooms"
              className="inline-flex items-center justify-center bg-amber-500 hover:bg-amber-600 text-slate-900 px-8 py-3 rounded-lg font-semibold transition"
            >
              Explore All Rooms
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
