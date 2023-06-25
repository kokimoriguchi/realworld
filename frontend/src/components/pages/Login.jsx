import { useNavigate } from "react-router-dom";
import { useContext, useRef } from "react";
import { AuthContext } from "../hooks/Auth";
import baseAxios from "../hooks/axios";

const Login = () => {
  const navigate = useNavigate();
  const loginEmailRef = useRef();
  const loginPasswordRef = useRef();
  const { setAuth } = useContext(AuthContext);

  const LoginUser = async (e) => {
    e.preventDefault();
    const loginDate = {
      email: loginEmailRef.current.value,
      password: loginPasswordRef.current.value,
    };

    try {
      const checkLoginResponse = await baseAxios.post("/sign_in", {
        user: { ...loginDate },
      });
      const auth = checkLoginResponse.data.token; // トークンを取得

      const loginResponse = await baseAxios.get("/api/user", {
        headers: {
          Authorization: `Bearer ${auth}`,
        },
      });
      setAuth(auth);
      navigate(`/loginHome/${loginResponse.data.user.id}`);
    } catch (error) {
      console.log(error);
      alert("loginに失敗しました");
    }
    loginEmailRef.current.value = "";
    loginPasswordRef.current.value = "";
  };

  const MoveCreateUser = () => {
    navigate("/create_user");
  };

  return (
    <div className="h-4/5">
      <div className="flex flex-col items-center justify-center mt-6 mx-auto">
        <h1 className="text-4xl pb-2">Sign in</h1>
        <p
          className="text-green-500 text-sm hover:text-green-700 hover:underline pb-3"
          onClick={() => {
            MoveCreateUser();
          }}
        >
          Need an account?
        </p>
        <form onSubmit={LoginUser}>
          <div className="pb-4">
            <input
              className="w-96 border-slate-200 rounded-md h-12 border-2"
              type="text"
              placeholder="Email"
              ref={loginEmailRef}
            />
          </div>
          <div className="pb-4">
            <input
              className="w-96 border-slate-200 rounded-md h-12 border-2"
              type="text"
              placeholder="password"
              ref={loginPasswordRef}
            />
          </div>
          <div className="flex flex-row-reverse">
            <button
              className="w-32 text-white bg-green-500 border-slate-200 rounded-md h-14 text-lg border-2"
              type="submit"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;
