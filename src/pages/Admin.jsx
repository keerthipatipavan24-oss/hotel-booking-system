import { useState } from "react";
import {
  BedDouble,
  Pencil,
  Trash2,
  Plus,
  X,
  AlertTriangle,
} from "lucide-react";

const defaultRooms = [
  {
    id: 1,
    name: "Deluxe Ocean View Room",
    type: "Deluxe",
    location: "Hyderabad",
    price: 3500,
    capacity: 2,
    image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=900",
    rating: 4.8,
    amenities: ["Free Wi-Fi", "Air Conditioning", "Room Service"],
  },
  {
    id: 2,
    name: "Luxury King Suite",
    type: "Suite",
    location: "Bengaluru",
    price: 5500,
    capacity: 4,
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=900",
    rating: 4.9,
    amenities: ["Free Wi-Fi", "Swimming Pool", "Breakfast"],
  },
  {
    id: 3,
    name: "Premium Comfort Room",
    type: "Premium",
    location: "Chennai",
    price: 4200,
    capacity: 3,
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=900",
    rating: 4.7,
    amenities: ["Free Wi-Fi", "Air Conditioning", "TV"],
  },
  {
    id: 4,
    name: "Executive Business Room",
    type: "Deluxe",
    location: "Hyderabad",
    price: 3000,
    capacity: 2,
    image: "https://images.unsplash.com/photo-1591088398332-8a7791972843?w=900",
    rating: 4.6,
    amenities: ["Free Wi-Fi", "Work Desk", "Room Service"],
  },
  {
    id: 5,
    name: "Family Garden Suite",
    type: "Suite",
    location: "Bengaluru",
    price: 6500,
    capacity: 6,
    image: "https://images.unsplash.com/photo-1601918774946-25832a4be0d6?w=900",
    rating: 4.9,
    amenities: ["Free Wi-Fi", "Garden View", "Breakfast"],
  },
  {
    id: 6,
    name: "Classic Comfort Room",
    type: "Standard",
    location: "Vijayawada",
    price: 2200,
    capacity: 2,
    image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=900",
    rating: 4.5,
    amenities: ["Free Wi-Fi", "Air Conditioning", "TV"],
  },
  {
    id: 7,
    name: "Royal Premium Suite",
    type: "Premium",
    location: "Chennai",
    price: 7000,
    capacity: 4,
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=900",
    rating: 5.0,
    amenities: ["Free Wi-Fi", "Swimming Pool", "Breakfast"],
  },
  {
    id: 8,
    name: "Elegant Standard Room",
    type: "Standard",
    location: "Hyderabad",
    price: 2500,
    capacity: 2,
    image: "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=900",
    rating: 4.4,
    amenities: ["Free Wi-Fi", "Air Conditioning", "TV"],
  },
];

const emptyForm = {
  name: "",
  type: "Standard",
  location: "",
  price: "",
  capacity: "2",
  image: "",
};

export default function Admin() {
  const [rooms, setRooms] = useState(() => {
    const savedRooms = JSON.parse(localStorage.getItem("adminRooms") || "null");

    if (!savedRooms) return defaultRooms;

    return savedRooms.map((room) => {
      const defaultRoom = defaultRooms.find((item) => item.id === room.id);

      return {
        ...defaultRoom,
        ...room,
        image: room.image || defaultRoom?.image || "",
        rating: room.rating ?? defaultRoom?.rating ?? 4.5,
        amenities: room.amenities ?? defaultRoom?.amenities ?? [],
      };
    });
  });

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [error, setError] = useState("");

  const saveRooms = (updatedRooms) => {
    setRooms(updatedRooms);
    localStorage.setItem("adminRooms", JSON.stringify(updatedRooms));
  };

  const handleAdd = () => {
    setEditingId(null);
    setFormData(emptyForm);
    setError("");
    setShowModal(true);
  };

  const handleEdit = (room) => {
    setEditingId(room.id);

    setFormData({
      name: room.name,
      type: room.type,
      location: room.location,
      price: String(room.price),
      capacity: String(room.capacity),
      image: room.image || "",
    });

    setError("");
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!formData.name.trim()) {
      setError("Please enter the room name.");
      return;
    }

    if (!formData.location.trim()) {
      setError("Please enter the room location.");
      return;
    }

    if (
      !Number.isFinite(Number(formData.price)) ||
      Number(formData.price) <= 0
    ) {
      setError("Please enter a valid room price.");
      return;
    }

    if (
      !Number.isInteger(Number(formData.capacity)) ||
      Number(formData.capacity) < 1 ||
      Number(formData.capacity) > 10
    ) {
      setError("Capacity must be between 1 and 10 guests.");
      return;
    }

    if (!formData.image.trim()) {
      setError("Please enter a room image URL.");
      return;
    }

    if (!/^https?:\/\/.+/i.test(formData.image.trim())) {
      setError("Please enter a valid image URL.");
      return;
    }

    const existingRoom = rooms.find((room) => room.id === editingId);

    const roomDetails = {
      name: formData.name.trim(),
      type: formData.type,
      location: formData.location.trim(),
      price: Number(formData.price),
      capacity: Number(formData.capacity),
      image: formData.image.trim(),
      rating: existingRoom?.rating ?? 4.5,
      amenities: existingRoom?.amenities ?? [
        "Free Wi-Fi",
        "Air Conditioning",
        "Room Service",
      ],
    };

    let updatedRooms;

    if (editingId !== null) {
      updatedRooms = rooms.map((room) =>
        room.id === editingId ? { ...room, ...roomDetails } : room,
      );
    } else {
      updatedRooms = [
        ...rooms,
        {
          id: Date.now(),
          ...roomDetails,
        },
      ];
    }

    saveRooms(updatedRooms);
    setShowModal(false);
    setFormData(emptyForm);
    setEditingId(null);
  };

  const handleDelete = () => {
    const updatedRooms = rooms.filter((room) => room.id !== selectedRoomId);

    saveRooms(updatedRooms);
    setSelectedRoomId(null);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
    setFormData(emptyForm);
    setError("");
  };

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Page Header */}
      <section className="bg-slate-950 px-6 lg:px-12 py-14">
        <div className="max-w-[1450px] mx-auto">
          <p className="text-amber-400 text-sm font-semibold tracking-widest mb-3">
            STAYEASE ADMINISTRATION
          </p>

          <h1 className="text-3xl md:text-5xl font-bold text-white">
            Room Management
          </h1>

          <p className="text-slate-300 mt-4 text-base md:text-lg">
            Manage hotel rooms, availability and pricing.
          </p>
        </div>
      </section>

      {/* Admin Content */}
      <section className="max-w-[1450px] mx-auto px-6 lg:px-12 py-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              Manage Rooms
            </h2>

            <p className="text-stone-600 mt-2">
              View and manage all hotel rooms.
            </p>
          </div>

          <button
            onClick={handleAdd}
            className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 px-5 py-3 rounded-lg font-semibold transition"
          >
            <Plus size={18} />
            Add New Room
          </button>
        </div>

        {/* Room Table */}
        <div className="bg-white border border-stone-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-stone-200">
            <h3 className="text-xl font-bold text-slate-900">Room Details</h3>
          </div>

          {rooms.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[900px]">
                <thead className="bg-stone-50">
                  <tr className="text-sm text-stone-600">
                    <th className="px-6 py-4 font-semibold">Room</th>
                    <th className="px-6 py-4 font-semibold">Room Name</th>
                    <th className="px-6 py-4 font-semibold">Type</th>
                    <th className="px-6 py-4 font-semibold">Location</th>
                    <th className="px-6 py-4 font-semibold">Price / Day</th>
                    <th className="px-6 py-4 font-semibold">Capacity</th>
                    <th className="px-6 py-4 font-semibold">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-stone-100">
                  {rooms.map((room) => (
                    <tr key={room.id} className="text-sm">
                      <td className="px-6 py-4">
                        <img
                          src={room.image}
                          alt={room.name}
                          className="w-24 h-16 object-cover rounded-lg"
                          onError={(e) => {
                            e.currentTarget.src =
                              "https://placehold.co/300x200?text=Room";
                          }}
                        />
                      </td>

                      <td className="px-6 py-5 font-semibold text-slate-900">
                        {room.name}
                      </td>

                      <td className="px-6 py-5 text-stone-600">{room.type}</td>

                      <td className="px-6 py-5 text-stone-600">
                        {room.location}
                      </td>

                      <td className="px-6 py-5 font-semibold text-amber-600">
                        ₹{room.price.toLocaleString("en-IN")}
                      </td>

                      <td className="px-6 py-5 text-stone-600">
                        {room.capacity} Guests
                      </td>

                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleEdit(room)}
                            aria-label="Edit room"
                            className="text-blue-600 hover:text-blue-800 transition"
                          >
                            <Pencil size={18} />
                          </button>

                          <button
                            onClick={() => setSelectedRoomId(room.id)}
                            aria-label="Delete room"
                            className="text-red-600 hover:text-red-800 transition"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-16 px-6">
              <BedDouble size={42} className="mx-auto text-stone-400" />

              <h3 className="text-xl font-bold text-slate-900 mt-4">
                No Rooms Available
              </h3>

              <p className="text-stone-500 mt-2">
                Add a new room to get started.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Add / Edit Room Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4 py-6"
          onClick={closeModal}
        >
          <div
            className="bg-white w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl p-6 md:p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="room-modal-title"
          >
            <div className="flex items-center justify-between mb-6">
              <h2
                id="room-modal-title"
                className="text-xl md:text-2xl font-bold text-slate-900"
              >
                {editingId !== null ? "Edit Room" : "Add New Room"}
              </h2>

              <button
                onClick={closeModal}
                aria-label="Close modal"
                className="text-stone-400 hover:text-slate-900"
              >
                <X size={23} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <label className="block text-sm font-semibold text-slate-800 mb-2">
                  Room Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter room name"
                  className="w-full h-12 px-4 border border-stone-200 rounded-lg outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-800 mb-2">
                    Room Type
                  </label>

                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full h-12 px-4 border border-stone-200 rounded-lg bg-white outline-none focus:border-amber-500"
                  >
                    <option value="Standard">Standard</option>
                    <option value="Deluxe">Deluxe</option>
                    <option value="Premium">Premium</option>
                    <option value="Suite">Suite</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-800 mb-2">
                    Location
                  </label>

                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Enter city"
                    className="w-full h-12 px-4 border border-stone-200 rounded-lg outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-800 mb-2">
                    Price Per Day (₹)
                  </label>

                  <input
                    type="number"
                    name="price"
                    min="1"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="Enter price"
                    className="w-full h-12 px-4 border border-stone-200 rounded-lg outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-800 mb-2">
                    Guest Capacity
                  </label>

                  <select
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleChange}
                    className="w-full h-12 px-4 border border-stone-200 rounded-lg bg-white outline-none focus:border-amber-500"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((count) => (
                      <option key={count} value={count}>
                        {count} {count === 1 ? "Guest" : "Guests"}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-800 mb-2">
                  Room Image URL
                </label>

                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="Paste room image URL"
                  className="w-full h-12 px-4 border border-stone-200 rounded-lg outline-none focus:border-amber-500"
                />

                {formData.image && (
                  <img
                    src={formData.image}
                    alt="Room preview"
                    className="mt-3 w-full h-40 object-cover rounded-lg"
                  />
                )}
              </div>

              {error && (
                <p className="text-sm text-red-600 font-medium" role="alert">
                  {error}
                </p>
              )}

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 border border-stone-300 hover:bg-stone-100 text-slate-900 py-3 rounded-lg font-semibold transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex-1 bg-amber-500 hover:bg-amber-600 text-slate-950 py-3 rounded-lg font-semibold transition"
                >
                  {editingId !== null ? "Save Changes" : "Add Room"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {selectedRoomId !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4"
          onClick={() => setSelectedRoomId(null)}
        >
          <div
            className="bg-white w-full max-w-md rounded-2xl p-7 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-room-title"
          >
            <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto">
              <AlertTriangle size={28} className="text-red-600" />
            </div>

            <h2
              id="delete-room-title"
              className="text-xl font-bold text-slate-900 text-center mt-5"
            >
              Delete Room?
            </h2>

            <p className="text-stone-600 text-sm text-center mt-3">
              Are you sure you want to delete this room? This action cannot be
              undone.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mt-7">
              <button
                onClick={() => setSelectedRoomId(null)}
                className="flex-1 border border-stone-300 hover:bg-stone-100 text-slate-900 py-3 rounded-lg font-semibold transition"
              >
                Keep Room
              </button>

              <button
                onClick={handleDelete}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
