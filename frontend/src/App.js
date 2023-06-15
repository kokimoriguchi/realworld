import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/pages/Login";
import CreateUser from "./components/pages/CreateUser";
import Home from "./components/pages/Home";
import Header from "./components/pages/Header";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="create_user" element={<CreateUser />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
