import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const LoginUser = () => {
    console.log("login done");
  };

  const MoveCreateUser = () => {
    navigate("create_user");
  };

  return (
    <div className="flex flex-col items-center justify-center pt-40">
      <h1>LOGIN</h1>
      <div>
        <input
          className="w-60 border-zinc-800 border-2"
          type="text"
          placeholder="name"
          // onChange={(e) => setLoginName(e.target.value)}
        />
      </div>
      <div>
        <input
          className="w-60 border-zinc-800 border-2"
          type="text"
          placeholder="password"
          // onChange={(e) => setLoginPassword(e.target.value)}
        />
      </div>
      <button className="w-60 border-zinc-800 border-2" onClick={LoginUser}>
        Login
      </button>
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
