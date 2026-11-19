import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  MapPin,
  Users,
  Search,
  SlidersHorizontal,
  Star,
  CalendarDays,
} from "lucide-react";

const defaultRooms = [
  {
    id: 1,
    name: "Deluxe Ocean View Room",
    type: "Deluxe",
    location: "Hyderabad",
    price: 3500,
    capacity: 2,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=900",
    amenities: ["Free Wi-Fi", "Air Conditioning", "Room Service"],
  },
  {
    id: 2,
    name: "Luxury King Suite",
    type: "Suite",
    location: "Bengaluru",
    price: 5500,
    capacity: 4,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=900",
    amenities: ["Free Wi-Fi", "Swimming Pool", "Breakfast"],
  },
  {
    id: 3,
    name: "Premium Comfort Room",
    type: "Premium",
    location: "Chennai",
    price: 4200,
    capacity: 3,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=900",
    amenities: ["Free Wi-Fi", "Air Conditioning", "TV"],
  },
  {
    id: 4,
    name: "Executive Business Room",
    type: "Deluxe",
    location: "Hyderabad",
    price: 3000,
    capacity: 2,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1591088398332-8a7791972843?w=900",
    amenities: ["Free Wi-Fi", "Work Desk", "Room Service"],
  },
  {
    id: 5,
    name: "Family Garden Suite",
    type: "Suite",
    location: "Bengaluru",
    price: 6500,
    capacity: 6,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1601918774946-25832a4be0d6?w=900",
    amenities: ["Free Wi-Fi", "Garden View", "Breakfast"],
  },
  {
    id: 6,
    name: "Classic Comfort Room",
    type: "Standard",
    location: "Vijayawada",
    price: 2200,
    capacity: 2,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=900",
    amenities: ["Free Wi-Fi", "Air Conditioning", "TV"],
  },
  {
    id: 7,
    name: "Royal Premium Suite",
    type: "Premium",
    location: "Chennai",
    price: 7000,
    capacity: 4,
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=900",
    amenities: ["Free Wi-Fi", "Swimming Pool", "Breakfast"],
  },
  {
    id: 8,
    name: "Elegant Standard Room",
    type: "Standard",
    location: "Hyderabad",
    price: 2500,
    capacity: 2,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=900",
    amenities: ["Free Wi-Fi", "Air Conditioning", "TV"],
  },
];

export default function Rooms() {
  const [searchParams] = useSearchParams();

  const destination = searchParams.get("destination") || "";
  const checkIn = searchParams.get("checkIn") || "";
  const checkOut = searchParams.get("checkOut") || "";
  const guests = Number(searchParams.get("guests") || 1);

  const hasSearch = Boolean(
    destination && checkIn && checkOut && searchParams.has("guests"),
  );

  const [roomType, setRoomType] = useState("All");
  const [sortOrder, setSortOrder] = useState("default");

  // Read the latest rooms added or updated in Admin
  const savedRooms = JSON.parse(localStorage.getItem("adminRooms") || "null");

  const rooms = savedRooms
    ? savedRooms.map((room) => {
        const defaultRoom = defaultRooms.find((item) => item.id === room.id);

        return {
          ...defaultRoom,
          ...room,
          image: room.image || defaultRoom?.image || "",
          rating: room.rating ?? defaultRoom?.rating ?? 4.5,
          amenities: room.amenities ?? defaultRoom?.amenities ?? [],
        };
      })
    : defaultRooms;

  // Calculate booking duration
  const days =
    checkIn && checkOut
      ? Math.max(
          0,
          Math.round(
            (Date.parse(`${checkOut}T00:00:00Z`) -
              Date.parse(`${checkIn}T00:00:00Z`)) /
              (1000 * 60 * 60 * 24),
          ),
        )
      : 0;

  // Normalize Bangalore and Bengaluru
  const normalizeCity = (city) => {
    const value = city.trim().toLowerCase();

    return value === "bangalore" ? "bengaluru" : value;
  };

  // Format dates
  const formatDate = (date) => {
    if (!date) return "";

    return new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // Filter and sort rooms
  const filteredRooms = rooms
    .filter((room) => {
      const matchesDestination =
        !destination.trim() ||
        normalizeCity(room.location) === normalizeCity(destination);

      const matchesGuests = room.capacity >= guests;

      const matchesType = roomType === "All" || room.type === roomType;

      return matchesDestination && matchesGuests && matchesType;
    })
    .sort((a, b) => {
      if (sortOrder === "lowToHigh") return a.price - b.price;
      if (sortOrder === "highToLow") return b.price - a.price;
      return 0;
    });

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Page Header */}
      <section className="bg-slate-950 px-6 lg:px-12 py-14">
        <div className="max-w-[1450px] mx-auto">
          <p className="text-amber-400 text-sm font-semibold tracking-widest mb-3">
            FIND YOUR COMFORT
          </p>

          <h1 className="text-3xl md:text-5xl font-bold text-white">
            Explore Our Rooms
          </h1>

          <p className="text-slate-300 mt-4 text-base md:text-lg">
            Discover comfortable rooms designed for every kind of journey.
          </p>
        </div>
      </section>

      {/* Room Catalogue */}
      <section className="max-w-[1450px] mx-auto px-6 lg:px-12 py-14">
        {/* Search Summary */}
        {hasSearch && (
          <div className="bg-white border border-stone-200 rounded-2xl p-6 md:p-8 mb-10">
            <div className="mb-6">
              <p className="text-amber-600 text-sm font-semibold tracking-widest mb-2">
                YOUR SEARCH
              </p>

              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                Available Rooms
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="flex items-center gap-3">
                <MapPin className="text-amber-500" size={21} />
                <div>
                  <p className="text-xs text-stone-500">Destination</p>
                  <p className="font-semibold text-slate-800">{destination}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <CalendarDays className="text-amber-500" size={21} />
                <div>
                  <p className="text-xs text-stone-500">Check-in / Check-out</p>
                  <p className="font-semibold text-slate-800">
                    {formatDate(checkIn)} – {formatDate(checkOut)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Users className="text-amber-500" size={21} />
                <div>
                  <p className="text-xs text-stone-500">Guests</p>
                  <p className="font-semibold text-slate-800">
                    {guests} {guests === 1 ? "Guest" : "Guests"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <CalendarDays className="text-amber-500" size={21} />
                <div>
                  <p className="text-xs text-stone-500">Duration</p>
                  <p className="font-semibold text-slate-800">
                    {days} {days === 1 ? "Day" : "Days"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results Heading */}
        <div className="mb-8">
          <p className="text-amber-600 text-sm font-semibold tracking-widest mb-2">
            {hasSearch ? "SEARCH RESULTS" : "FIND YOUR PERFECT ROOM"}
          </p>

          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
            {hasSearch ? "Available Rooms" : "Our Room Catalogue"}
          </h2>

          <p className="text-stone-600 mt-3">
            {filteredRooms.length} rooms found.
          </p>
        </div>

        {/* Room Filters */}
        <div className="bg-white border border-stone-200 rounded-xl p-4 mb-8 flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex items-center gap-2 text-slate-700 font-semibold">
            <SlidersHorizontal size={19} />
            Filters
          </div>

          <select
            value={roomType}
            onChange={(e) => setRoomType(e.target.value)}
            className="h-11 px-4 border border-stone-200 rounded-lg bg-white text-sm outline-none focus:border-amber-500 cursor-pointer"
          >
            <option value="All">All Room Types</option>
            <option value="Standard">Standard</option>
            <option value="Deluxe">Deluxe</option>
            <option value="Premium">Premium</option>
            <option value="Suite">Suite</option>
          </select>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="h-11 px-4 border border-stone-200 rounded-lg bg-white text-sm outline-none focus:border-amber-500 cursor-pointer"
          >
            <option value="default">Sort By: Default</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </select>
        </div>

        {/* Room Cards */}
        {filteredRooms.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
            {filteredRooms.map((room) => {
              const totalPrice = room.price * days;

              return (
                <div
                  key={room.id}
                  className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out flex flex-col"
                >
                  <img
                    src={room.image}
                    alt={room.name}
                    className="w-full h-52 object-cover"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://placehold.co/600x400?text=Room+Image";
                    }}
                  />

                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-amber-600 text-xs font-semibold bg-amber-50 px-3 py-1 rounded-full">
                        {room.type}
                      </span>

                      <span className="flex items-center gap-1 text-sm font-semibold text-slate-700">
                        <Star
                          size={15}
                          className="text-amber-500 fill-amber-500"
                        />
                        {room.rating}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 mt-4">
                      {room.name}
                    </h3>

                    <p className="text-sm text-stone-500 mt-2 flex items-center gap-2">
                      <MapPin size={15} />
                      {room.location}
                    </p>

                    <div className="flex items-center gap-2 mt-3 text-sm text-stone-500">
                      <Users size={15} />
                      Up to {room.capacity} guests
                    </div>

                    <div className="flex flex-wrap gap-2 mt-4">
                      {room.amenities.map((amenity) => (
                        <span
                          key={amenity}
                          className="text-xs text-stone-600 bg-stone-100 px-2 py-1 rounded-md"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>

                    <div className="border-t border-stone-100 mt-auto pt-5">
                      <p className="text-xs text-stone-500">
                        {hasSearch && days > 0
                          ? `${days} ${days === 1 ? "day" : "days"} · Estimated total`
                          : "Starting price per day"}
                      </p>

                      <div className="flex items-center justify-between gap-3 mt-1">
                        <div>
                          <p className="text-xl font-bold text-amber-600">
                            ₹
                            {(hasSearch && days > 0
                              ? totalPrice
                              : room.price
                            ).toLocaleString("en-IN")}
                          </p>

                          <p className="text-xs text-stone-500">
                            ₹{room.price.toLocaleString("en-IN")} / day
                          </p>
                        </div>

                        <Link
                          to={`/rooms/${room.id}`}
                          className="bg-slate-900 hover:bg-amber-500 hover:text-slate-900 text-white px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-300 ease-in-out"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white rounded-2xl border border-stone-200 text-center py-16 px-6">
            <Search size={36} className="mx-auto text-stone-400 mb-4" />

            <h3 className="text-2xl font-bold text-slate-900">
              No Rooms Available
            </h3>

            <p className="text-stone-500 mt-3">
              We couldn't find rooms matching your destination, guest count or
              selected filters.
            </p>

            <button
              onClick={() => {
                setRoomType("All");
                setSortOrder("default");
              }}
              className="mt-6 bg-amber-500 hover:bg-amber-600 text-slate-950 px-6 py-3 rounded-lg font-semibold transition"
            >
              Clear Filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
