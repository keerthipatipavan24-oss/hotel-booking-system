import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Rooms from "./pages/Rooms";
import RoomDetails from "./pages/RoomDetails";
import MyBookings from "./pages/MyBookings";
import BookingForm from "./pages/BookingForm";
import BookingConfirmation from "./pages/BookingConfirmation";
import Admin from "./pages/Admin";
import BookingManagement from "./pages/BookingManagement";
import Profile from "./pages/Profile";
import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/rooms/:id" element={<RoomDetails />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/book/:id" element={<BookingForm />} />
        <Route path="/booking-confirmation" element={<BookingConfirmation />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/booking-management" element={<BookingManagement />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
