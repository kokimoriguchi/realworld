import { useNavigate } from "react-router-dom";
import { useContext, useRef } from "react";
import baseAxios from "../hooks/axios";
import { AuthContext } from "../hooks/Auth";

const CreateUser = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);

  const MoveUserLogin = () => {
    navigate("/login");
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    const userData = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
    };
    console.log(userData);

    try {
      const response = await baseAxios.post("/api/users", {
        user: { ...userData },
      });
      console.log(response.data);

      const checkLoginResponse = await baseAxios.post("/sign_in", {
        user: { ...userData },
      });
      const token = checkLoginResponse.data.token; // トークンを取得
      const loginResponse = await baseAxios.get("/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(loginResponse.data);
      navigate("/loginHome");
      setAuth(loginResponse.data);
      // リクエスト成功時の処理を記述
    } catch (error) {
      console.log(error);
      // リクエスト失敗時の処理を記述
      alert("ユーザーの作成に失敗しました！");
    }
    nameRef.current.value = "";
    emailRef.current.value = "";
    passwordRef.current.value = "";
    passwordConfirmationRef.current.value = "";
  };

  return (
    <div className="h-4/5">
      <div className="flex flex-col items-center justify-center mt-6 mx-auto">
        <h1 className="text-4xl pb-2">Sign up</h1>
        <p
          className="text-green-500 text-sm hover:text-green-700 hover:underline pb-3"
          onClick={() => {
            MoveUserLogin();
          }}
        >
          Have an account?
        </p>
        <form onSubmit={handleCreateUser}>
          <div className="pb-4">
            <input
              className="w-96 border-slate-200 rounded-md h-12 border-2"
              type="text"
              placeholder="name"
              ref={nameRef}
            />
          </div>
          <div className="pb-4">
            <input
              className="w-96 border-slate-200 rounded-md h-12 border-2"
              type="text"
              placeholder="email"
              ref={emailRef}
            />
          </div>
          <div className="pb-4">
            <input
              className="w-96 border-slate-200 rounded-md h-12 border-2"
              type="text"
              placeholder="password"
              ref={passwordRef}
            />
          </div>
          <div className="pb-4">
            <input
              className="w-96 border-slate-200 rounded-md h-12 border-2"
              type="text"
              placeholder="password_confirmation"
              ref={passwordConfirmationRef}
            />
          </div>
          <div className="flex flex-row-reverse">
            <button
              className="w-32 text-white bg-green-500 border-slate-200 rounded-md h-14 text-lg border-2"
              type="submit"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
