import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/pages/Login";
import CreateUser from "./components/pages/CreateUser";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="create_user" element={<CreateUser />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
