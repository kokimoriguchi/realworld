import { useNavigate } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../hooks/Auth";

const Header = () => {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const [isLoggedIn, setIsLoggedIn] = useState(!!auth);

  useEffect(() => {
    setIsLoggedIn(!!auth);
  }, [auth]);

  const handleHomeClick = () => {
    navigate("/home");
  };

  const handleSignInClick = () => {
    navigate("/login");
  };

  const handleSignUpClick = () => {
    navigate("/create_user");
  };

  const handleArticleClick = () => {
    navigate("createArticle");
  };

  const handleLoginHomeClick = () => {
    navigate("loginHome");
  };

  const handleLogoutClick = () => {
    navigate("logout");
  };
  return (
    <div className="flex justify-between items-center px-40 h-14">
      <div className="">
        <p className="text-3xl text-green-500">conduit</p>
      </div>
      <div className="">
        <ul className="md:flex space-x-3 ">
          {isLoggedIn ? (
            <>
              <li
                className="text-gray-400 hover:text-gray-500"
                onClick={handleLoginHomeClick}
              >
                Home
              </li>

              <li
                className="text-gray-400 hover:text-gray-500"
                onClick={handleArticleClick}
              >
                🗒️New Article
              </li>
              <li
                className="text-gray-400 hover:text-gray-500"
                onClick={handleLogoutClick}
              >
                ☀︎Setting
              </li>
              <li className="text-gray-400 hover:text-gray-500">
                user:{auth?.user?.name || ""}
              </li>
            </>
          ) : (
            <>
              <li
                className="text-gray-400 hover:text-gray-500"
                onClick={handleHomeClick}
              >
                Home
              </li>

              <li
                className="text-gray-400 hover:text-gray-500"
                onClick={handleSignInClick}
              >
                Sign in
              </li>
              <li
                className="text-gray-400 hover:text-gray-500"
                onClick={handleSignUpClick}
              >
                Sign up
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};
export default Header;
