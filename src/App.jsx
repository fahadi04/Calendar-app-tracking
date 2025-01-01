

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminModule from "./modules/AdminModule";
import UserModule from "./modules/UserModule";
import ReportingModule from "./modules/ReportingModule";
import MethodsList from "./components/MethodsList"; 
import NavBar from "./components/Navbar";
import "./styles.css";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/admin" element={<AdminModule />} />
        <Route path="/user" element={<UserModule />} />
        <Route path="/reporting" element={<ReportingModule />} />
        {/* Add a route for MethodsList */}
        <Route path="/methods" element={<MethodsList />} />{" "}
        {/* Render MethodsList component here */}
      </Routes>
    </Router>
  );
}

export default App;
