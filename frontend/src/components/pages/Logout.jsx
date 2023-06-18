import { AuthContext } from "../hooks/Auth";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loginName, setLoginName] = useState("");
  const [loginEmail, setLoginEmail] = useState("");

  const handleLogout = () => {
    setAuth({});
    navigate("/home");
  };

  useEffect(() => {
    setLoginName(auth.user.name || "");
    setLoginEmail(auth.user.email || "");
  }, [auth]);

  return (
    <div className="flex flex-col justify-center items-center pt-10">
      <div className="text-4xl text-gray-800 text-opacity-90 pb-3">
        Your Settings
      </div>
      <div className="pb-4 w-screen justify-center flex">
        <input
          className="w-2/5 border-slate-200 rounded-md h-12 border-2"
          type="text"
          placeholder="URL of profile picture"
        />
      </div>
      <div className="pb-4 w-screen justify-center flex">
        <input
          className="w-2/5 border-slate-200 rounded-md h-12 border-2"
          type="text"
          value={loginName}
          placeholder="Your Name"
          onChange={(e) => setLoginName(e.target.value)}
        />
      </div>
      <div className="pb-4 w-screen justify-center flex">
        <textarea
          className="w-2/5 border-slate-200 rounded-md h-40 border-2"
          type="text"
          placeholder="Short bio about you"
        />
      </div>
      <div className="pb-4 w-screen justify-center flex">
        <input
          className="w-2/5 border-slate-200 rounded-md h-12 border-2"
          type="text"
          value={loginEmail}
          placeholder="Email"
          onChange={(e) => setLoginEmail(e.target.value)}
        />
      </div>
      <div className="pb-4 w-screen justify-center flex">
        <input
          className="w-2/5 border-slate-200 rounded-md h-12 border-2"
          type="text"
          placeholder="Password"
        />
      </div>
      <div className="flex flex-row-reverse">
        <button
          className="w-48 text-white bg-green-500 border-slate-200 rounded-md h-14 text-lg border-2"
          type="submit"
        >
          Update Setting
        </button>
      </div>
      <hr />
      <div className="">
        <hr />
        <button
          className="text-red-300 border-2 border-red-300"
          onClick={handleLogout}
        >
          or click here to logout.
        </button>
      </div>
    </div>
  );
};

export default Logout;
