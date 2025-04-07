import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Leaderboard from "./Leaderboard";
import EntryList from "./EntryList";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Leaderboard />} />
        <Route path="/entries" element={<EntryList />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);