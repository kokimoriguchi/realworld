import { useNavigate } from "react-router-dom";

const CreateUser = () => {
  const navigate = useNavigate();

  const Back = () => {
    navigate("/");
  };
  return (
    <div className="flex flex-col items-center justify-center pt-40">
      <h1>CREATE USER</h1>
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
          placeholder="email"
          // onChange={(e) => setLoginPassword(e.target.value)}
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
      <div>
        <input
          className="w-60 border-zinc-800 border-2"
          type="text"
          placeholder="password_confirmation"
          // onChange={(e) => setLoginPassword(e.target.value)}
        />
      </div>
      <button className="w-60 border-zinc-800 border-2">Create</button>
      <button className="w-60 border-zinc-800 border-2" onClick={Back}>
        Back
      </button>
    </div>
  );
};

export default CreateUser;
