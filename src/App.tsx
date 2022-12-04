import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Header from "./components/Navbar";
import SignUp from "./SignUp";
import Home from "./Home";
import Event from "./Event";
import ReserveTicket from "./ReserveTicket";
import Orders from "./Orders";

export const SERVER_URL = "https://ticket-booking-server.onrender.com/api";
// export const SERVER_URL = "http://localhost:8080/api";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="/" element={<Home />} />
        <Route path="/:eventSlug" element={<Event />} />
        <Route path="/:eventSlug/reserve" element={<ReserveTicket />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </>
  );
};

export default App;
