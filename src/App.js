import React from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Close from "./views/Close";
import OnePlayer from "./views/OnePlayer";
import TwoPlayers from "./views/TwoPlayers";
import Ranking from "./components/Ranking/Ranking";
import "reflect-metadata";
import Multiplayer from "./views/Multiplayer";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/onePlayer" element={<OnePlayer />} />
          <Route path="/multiplayer" element={<Multiplayer />} />
          <Route path="/twoPlayers" element={<TwoPlayers />} />
          <Route path="/ranking" element={<Ranking />} />
          <Route path="/close" element={<Close />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
