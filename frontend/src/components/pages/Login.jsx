import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const loginEmailRef = useRef();
  const loginPasswordRef = useRef();

  const LoginUser = async (e) => {
    e.preventDefault();
    const loginDate = {
      email: loginEmailRef.current.value,
      password: loginPasswordRef.current.value,
    };

    try {
      const checkLoginResponse = await axios.post(
        "http://localhost:3001/sign_in",
        {
          user: { ...loginDate },
        }
      );
      const token = checkLoginResponse.data.token; // トークンを取得
      console.log(token);
      const loginResponse = await axios.get("http://localhost:3001/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(loginResponse.data);
      navigate("home");
    } catch (error) {
      console.log(error);
    }
    loginEmailRef.current.value = "";
    loginPasswordRef.current.value = "";
  };

  const MoveCreateUser = () => {
    navigate("create_user");
  };

  return (
    <div className="flex flex-col items-center justify-center pt-40">
      <h1>LOGIN</h1>
      <form onSubmit={LoginUser}>
        <div>
          <input
            className="w-60 border-zinc-800 border-2"
            type="text"
            placeholder="email"
            ref={loginEmailRef}
          />
        </div>
        <div>
          <input
            className="w-60 border-zinc-800 border-2"
            type="text"
            placeholder="password"
            ref={loginPasswordRef}
          />
        </div>
        <button className="w-60 border-zinc-800 border-2" type="submit">
          Login
        </button>
      </form>
      <button
        className="w-60 border-zinc-800 border-2"
        onClick={() => {
          MoveCreateUser();
        }}
      >
        CreateUser
      </button>
    </div>
  );
};
export default Login;
