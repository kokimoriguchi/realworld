import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import axios from "axios";

const CreateUser = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();

  const handleInputChange = async (e) => {
    e.preventDefault();
    const userData = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
    };
    console.log(userData);

    try {
      const response = await axios.post("http://localhost:3001/api/users", {
        user: { ...userData },
      });
      console.log(response.data);
      alert("ユーザー作成しました！");

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

  const navigate = useNavigate();

  const Back = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center pt-40">
      <h1>CREATE USER</h1>
      <form onSubmit={handleInputChange}>
        <div>
          <input
            className="w-60 border-zinc-800 border-2"
            type="text"
            placeholder="name"
            ref={nameRef}
          />
        </div>
        <div>
          <input
            className="w-60 border-zinc-800 border-2"
            type="text"
            placeholder="email"
            ref={emailRef}
          />
        </div>
        <div>
          <input
            className="w-60 border-zinc-800 border-2"
            type="text"
            placeholder="password"
            ref={passwordRef}
          />
        </div>
        <div>
          <input
            className="w-60 border-zinc-800 border-2"
            type="text"
            placeholder="password_confirmation"
            ref={passwordConfirmationRef}
          />
        </div>
        <button className="w-60 border-zinc-800 border-2" type="submit">
          Create
        </button>
      </form>
      <button className="w-60 border-zinc-800 border-2" onClick={Back}>
        Back
      </button>
    </div>
  );
};

export default CreateUser;
