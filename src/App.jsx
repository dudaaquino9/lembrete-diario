import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Reminders from "./pages/Reminders";
import AddMood from "./pages/AddMood";
import LogWater from "./pages/LogWater";
import TakeABreak from "./pages/TakeABreak";

export default function App() {
  return (
    <div className="app-container">
      <h1 className="title">Health Tracker</h1>
      
      <div className="button-group">
        <Link to="/reminders" className="btn btn-reminders">⏰ Reminders</Link>
        <Link to="/add-mood" className="btn">😊 Add Mood</Link>
        <Link to="/log-water" className="btn">💧 Log Water</Link>
        <Link to="/take-a-break" className="btn">☕ Take a Break</Link>
      </div>

      <Routes>
        <Route path="/reminders" element={<Reminders />} />
        <Route path="/add-mood" element={<AddMood />} />
        <Route path="/log-water" element={<LogWater />} />
        <Route path="/take-a-break" element={<TakeABreak />} />
      </Routes>
    </div>
  );
}
