import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Star,
  MapPin,
  Wifi,
  Wind,
  Tv,
  Coffee,
  Bath,
  BedDouble,
} from "lucide-react";

const roomData = [
  {
    id: 1,
    name: "Deluxe Ocean View Room",
    type: "Deluxe",
    location: "Hyderabad",
    price: 3500,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1200",
    description:
      "Enjoy a relaxing stay in our beautifully designed deluxe room with elegant interiors and modern comforts.",
    amenities: [
      "Free Wi-Fi",
      "Air Conditioning",
      "Smart TV",
      "King Size Bed",
      "Coffee Maker",
      "Private Bathroom",
    ],
  },
  {
    id: 2,
    name: "Luxury King Suite",
    type: "Suite",
    location: "Bengaluru",
    price: 5500,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200",
    description:
      "Experience spacious luxury with premium furnishings and a comfortable atmosphere.",
    amenities: [
      "Free Wi-Fi",
      "Air Conditioning",
      "Smart TV",
      "King Size Bed",
      "Coffee Maker",
      "Private Bathroom",
    ],
  },
  {
    id: 3,
    name: "Premium Comfort Room",
    type: "Premium",
    location: "Chennai",
    price: 4200,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200",
    description:
      "A peaceful and comfortable room designed for guests who appreciate style and convenience.",
    amenities: [
      "Free Wi-Fi",
      "Air Conditioning",
      "Smart TV",
      "Queen Size Bed",
      "Coffee Maker",
      "Private Bathroom",
    ],
  },
  {
    id: 4,
    name: "Executive Business Room",
    type: "Deluxe",
    location: "Hyderabad",
    price: 3000,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1591088398332-8a7791972843?w=1200",
    description:
      "A practical and elegant space designed for business travellers and comfortable stays.",
    amenities: [
      "Free Wi-Fi",
      "Air Conditioning",
      "Smart TV",
      "Work Desk",
      "Coffee Maker",
      "Private Bathroom",
    ],
  },
  {
    id: 5,
    name: "Family Garden Suite",
    type: "Suite",
    location: "Bengaluru",
    price: 6500,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1601918774946-25832a4be0d6?w=1200",
    description:
      "Enjoy a spacious family-friendly suite with relaxing interiors and plenty of room.",
    amenities: [
      "Free Wi-Fi",
      "Air Conditioning",
      "Smart TV",
      "King Size Bed",
      "Coffee Maker",
      "Private Bathroom",
    ],
  },
  {
    id: 6,
    name: "Classic Comfort Room",
    type: "Standard",
    location: "Vijayawada",
    price: 2200,
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1200",
    description:
      "A simple and welcoming room offering essential comforts for a pleasant stay.",
    amenities: [
      "Free Wi-Fi",
      "Air Conditioning",
      "Smart TV",
      "Queen Size Bed",
      "Coffee Maker",
      "Private Bathroom",
    ],
  },
  {
    id: 7,
    name: "Royal Premium Suite",
    type: "Premium",
    location: "Chennai",
    price: 7000,
    rating: 5.0,
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200",
    description:
      "Discover an elevated stay with sophisticated interiors and premium room comforts.",
    amenities: [
      "Free Wi-Fi",
      "Air Conditioning",
      "Smart TV",
      "King Size Bed",
      "Coffee Maker",
      "Private Bathroom",
    ],
  },
  {
    id: 8,
    name: "Elegant Standard Room",
    type: "Standard",
    location: "Hyderabad",
    price: 2500,
    rating: 4.4,
    image:
      "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=1200",
    description:
      "A cosy and elegant room offering a comfortable stay at an affordable price.",
    amenities: [
      "Free Wi-Fi",
      "Air Conditioning",
      "Smart TV",
      "Queen Size Bed",
      "Coffee Maker",
      "Private Bathroom",
    ],
  },
];

const amenityIcons = [Wifi, Wind, Tv, BedDouble, Coffee, Bath];

export default function RoomDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const room = roomData.find((item) => item.id === Number(id));

  if (!room) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-6">
        <h2 className="text-3xl font-bold text-slate-900">Room Not Found</h2>

        <Link
          to="/rooms"
          className="bg-amber-500 hover:bg-amber-600 text-slate-900 px-6 py-3 rounded-lg font-semibold transition"
        >
          Back to Rooms
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-stone-50 min-h-screen">
      <section className="max-w-[1450px] mx-auto px-6 lg:px-12 py-10">
        {/* Back Navigation */}
        <Link
          to="/rooms"
          className="inline-flex items-center gap-2 text-stone-600 hover:text-amber-600 font-semibold transition mb-8"
        >
          <ArrowLeft size={19} />
          Back to Rooms
        </Link>

        {/* Room Details - Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left Side - Room Image */}
          <div>
            <img
              src={room.image}
              alt={room.name}
              className="w-full h-[300px] sm:h-[400px] lg:h-[600px] object-cover rounded-2xl shadow-md"
            />
          </div>

          {/* Right Side - Room Information */}
          <div className="flex flex-col gap-6">
            {/* Room Heading */}
            <div>
              <span className="inline-block bg-amber-100 text-amber-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
                {room.type}
              </span>

              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
                {room.name}
              </h1>

              <div className="flex flex-wrap items-center gap-5 mt-4">
                <p className="flex items-center gap-2 text-stone-500">
                  <MapPin size={18} />
                  {room.location}
                </p>

                <p className="flex items-center gap-2">
                  <Star size={18} className="text-amber-500 fill-amber-500" />
                  <span className="font-bold text-slate-900">
                    {room.rating}
                  </span>
                  <span className="text-stone-500 text-sm">Guest Rating</span>
                </p>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                About This Room
              </h2>

              <p className="text-stone-600 leading-relaxed">
                {room.description}
              </p>
            </div>

            {/* Amenities */}
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-4">
                Room Amenities
              </h2>

              <div className="grid grid-cols-2 gap-4">
                {room.amenities.map((amenity, index) => {
                  const Icon = amenityIcons[index];

                  return (
                    <div
                      key={amenity}
                      className="flex items-center gap-3 text-stone-600"
                    >
                      <Icon size={19} className="text-amber-600 shrink-0" />
                      <span className="text-sm">{amenity}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
              <p className="text-sm text-stone-500 mb-2">Room Price</p>

              <p className="text-3xl font-bold text-amber-600">
                ₹{room.price.toLocaleString("en-IN")}
                <span className="text-base font-normal text-stone-500">
                  {" "}
                  / day
                </span>
              </p>

              <p className="text-sm text-stone-500 mt-2">
                Taxes and additional charges may apply.
              </p>
            </div>

            {/* Book Now Button */}
            <button
              onClick={() => navigate(`/book/${room.id}`)}
              className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 py-4 rounded-xl font-bold text-base transition duration-300 shadow-sm"
            >
              Book Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
