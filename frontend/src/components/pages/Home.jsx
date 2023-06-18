import React, { useEffect, useState } from "react";
import baseAxios from "../hooks/axios";

const Home = () => {
  const [allArticles, setAllArticles] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    const indexArticle = async () => {
      try {
        const response = await baseAxios.get("api/articles");
        console.log(response);
        setAllArticles(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    indexArticle();
  }, []);

  useEffect(() => {
    const allUsers = async () => {
      try {
        const responseUsers = await baseAxios.get("api/users");
        setAllUsers(responseUsers.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    allUsers();
  }, []);

  return (
    <div>
      <div>
        <div className="bg-green-500 h-40 flex flex-col justify-center items-center text-white">
          <div className="text-4xl">conduit</div>
          <p className="text-lg">A place to share your knowledge.</p>
        </div>
      </div>
      <div className="mx-28 pt-10">
        <div className="h-screen grid grid-cols-5">
          <div className="col-span-4">
            {allArticles.map((article, index) => (
              <div key={index}>
                <div className="pb-3">
                  {allUsers.map((user, index) => {
                    if (user.id === article.user_id) {
                      return <p key={index}>☺️{user.name}</p>;
                    }
                    return null;
                  })}
                  <p className="opacity-30 text-xs">{article.created_at}</p>
                </div>
                <div className="h-40">
                  <p className=" font-semibold text-xl">{article.title}</p>
                  <p className="test-sm opacity-30">{article.body}</p>
                </div>
                <p className="text-xs opacity-30">Read more</p>
                <hr />
              </div>
            ))}
          </div>
          <div className="col-span-1">
            <div className="h-40 bg-slate-500 bg-opacity-5 rounded-md ml-6">
              <p className="pt-1 pl-2 font-normal text-sm">Popular Tags</p>
              <div className="flex flex-row">
                <div className="text-white bg-gray-600 bg-opacity-60 text-xs rounded-3xl text-center mt-1 ml-1 w-2/4">
                  <p className="py-1 px-1">implementation</p>
                </div>
                <div className="text-white bg-gray-600 bg-opacity-60 text-xs rounded-3xl text-center mt-1 ml-0.5 w-16">
                  <p className="py-1 px-1">welcome</p>
                </div>
              </div>
              <div className="flex flex-row">
                <div className="text-white bg-gray-600 bg-opacity-60 text-xs rounded-3xl text-center mt-1 ml-1 w-2/5">
                  <p className="py-1 px-1">introduction</p>
                </div>
                <div className="text-white bg-gray-600 bg-opacity-60 text-xs rounded-3xl text-center mt-1 ml-0.5 w-24">
                  <p className="py-1 px-1">codebaseShow</p>
                </div>
              </div>
              <div className="flex flex-row">
                <div className="text-white bg-gray-600 bg-opacity-60 text-xs rounded-3xl text-center mt-1 ml-1 w-2/5">
                  <p className="py-1 px-1">ipsum</p>
                </div>
                <div className="text-white bg-gray-600 bg-opacity-60 text-xs rounded-3xl text-center mt-1 ml-0.5 w-2/5">
                  <p className="py-1 px-1">qui</p>
                </div>
                <div className="text-white bg-gray-600 bg-opacity-60 text-xs rounded-3xl text-center mt-1 ml-0.5 w-2/5">
                  <p className="py-1 px-1">cupiditate</p>
                </div>
                <div className="text-white bg-gray-600 bg-opacity-60 text-xs rounded-3xl text-center mt-1 ml-0.5 w-2/5">
                  <p className="py-1 px-1">et</p>
                </div>
                <div className="text-white bg-gray-600 bg-opacity-60 text-xs rounded-3xl text-center mt-1 ml-0.5 w-2/5">
                  <p className="py-1 px-1">quia</p>
                </div>
              </div>
              <div className="flex flex-row">
                <div className="text-white bg-gray-600 bg-opacity-60 text-xs rounded-3xl text-center mt-1 ml-1 w-2/8">
                  <p className="py-1 px-1">deserunt</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
