import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login } from "./Login";
import { Home } from "./Home";

export const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="/login/*" element={<Login />} />
      </Routes>
    </Router>
  );
};
