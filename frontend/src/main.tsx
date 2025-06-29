import "./index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import components
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import Doctors from "./components/Doctors";
import CommunityChat from "./components/CommunityChat";
import Search from "./components/Search";
import Register from "./components/Register";
import Signup from "./components/Signup";
import Login from "./components/Login";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/community" element={<CommunityChat />} />
        <Route path="/search" element={<Search />} />
        <Route path="/register" element={<Register />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
