import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./views/Home";
import Statistics from "./views/Statistics";
import NotFoundPage from "./views/NotFoundPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="statistics" element={<Statistics />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}
