import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const handleHomeClick = () => {
    navigate("/");
  };

  const handleSignInClick = () => {
    navigate("login");
  };

  const handleSignUpClick = () => {
    navigate("create_user");
  };
  return (
    <div className="flex justify-between px-40 h-40">
      <div className="pt-5">
        <p className="text-3xl text-green-500">conduit</p>
      </div>
      <div className="pt-7">
        <ul className="md:flex space-x-4">
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
        </ul>
      </div>
    </div>
  );
};
export default Header;
