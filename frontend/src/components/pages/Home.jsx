import React, { useContext } from "react";
import { AuthContext } from "../hooks/Auth";

const Home = () => {
  const { auth } = useContext(AuthContext);
  return (
    <div>
      <div className="bg-green-500 h-40 flex flex-col justify-center items-center text-white">
        <div className="text-4xl">conduit</div>
        <p className="text-lg">A place to share your knowledge.</p>
        <p>{JSON.stringify(auth)}</p>
      </div>
    </div>
  );
};
export default Home;
