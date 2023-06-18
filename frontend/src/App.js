import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/pages/Login";
import CreateUser from "./components/pages/CreateUser";
import Home from "./components/pages/Home";
import Header from "./components/pages/Header";
import AuthProvider from "./components/hooks/Auth";
// import PrivateRoute from "./components/hooks/PrivateRoute";
import LoginHome from "./components/pages/LoginHome";
import Article from "./components/pages/Article";
import DetailArticle from "./components/pages/DetailArticle";
import UpdateArticle from "./components/pages/UpdateArticle";
import Logout from "./components/pages/Logout";
// import LoginHome from "./components/pages/LoginHome";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Header />
          <Routes>
            <Route path="/">
              <Route path="login" element={<Login />} />
              <Route path="create_user" element={<CreateUser />} />
              <Route path="home" element={<Home />} />
              <Route path="loginHome" element={<LoginHome />} />
              <Route path="createArticle" element={<Article />} />
              <Route path="detailArticle/:id" element={<DetailArticle />} />
              <Route path="updateArticle/:id" element={<UpdateArticle />} />
              <Route path="logout" element={<Logout />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
