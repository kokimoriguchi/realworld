import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../hooks/Auth";
import baseAxios from "../hooks/axios";
import { useNavigate } from "react-router-dom";

const DetailArticle = () => {
  const { id } = useParams();
  const { auth } = useContext(AuthContext);
  const [showArticle, setShowArticle] = useState({});
  const navigate = useNavigate();

  const deleteArticle = () => {
    navigate("/loginHome");
  };

  useEffect(() => {
    const getArticle = async () => {
      try {
        const response = await baseAxios.get(`api/articles/${id}`);
        setShowArticle(response.data.article);
      } catch (error) {
        console.log(error);
      }
    };
    getArticle();
  }, [id]);

  const handleArticleDelete = async () => {
    try {
      await baseAxios.delete(`api/articles/${id}`);
      console.log("delete");
      deleteArticle();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="bg-black bg-opacity-70 h-auto text-white">
        <div className="m-auto px-24">
          <h1 className="text-4xl py-8 pl-10">{showArticle.title}</h1>
          <div className="flex flex-row h-auto pl-10">
            <div className="pr-10">{showArticle.description}</div>
            {auth.user.id === showArticle.user_id ? (
              <div className="pb-10">
                <button
                  className="border-opacity-80 border-2 text-opacity-75 hover:test-white hover:bg-gray-100 duration-300 hover:bg-opacity-50 text-stone-50 border-stone-50 text-xs mr-3 rounded-sm"
                  onClick={() => navigate(`/updateArticle/${showArticle.id}`)}
                >
                  ✍️Edit Article
                </button>
                <button
                  className="border-2 border-opacity-50 text-opacity-75 text-xs hover:text-white duration-300 hover:bg-red-500 hover:bg-opacity-50 border-red-500 text-red-500 rounded-sm"
                  onClick={handleArticleDelete}
                >
                  🗑️Delete Article
                </button>
              </div>
            ) : (
              <div className="pb-10">
                <button className="border-opacity-80 border-2 text-opacity-75 hover:text-white duration-300 hover:bg-stone-50 hover:bg-opacity-80 text-stone-50 border-stone-50 text-xs mr-3 rounded-sm">
                  +Follow {showArticle.description}
                </button>
                <button className="border-2 border-opacity-50 text-opacity-75 text-xs hover:bg-green-400 duration-300 hover:text-white border-green-200 text-green-200 rounded-sm">
                  ♡Favorite Post
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="h-40 px-32 m-auto">
        <div className="">
          <h1 className="pt-20">{showArticle.body}</h1>
          <div className="pt-20">
            <hr />
          </div>
        </div>
      </div>
      <div className="pt-12">
        <div className="border-2 border-opacity-10 border-gray-500 h-40 mx-52 flex flex-col">
          <div className="h-2/3">
            <input
              type="text"
              placeholder="Write a comment..."
              className="w-full h-full"
            />
          </div>
          <div className="h-1/3 flex justify-between bg-gray-500 bg-opacity-20">
            <div className="py-2">
              <p className="mx-4 pt-1">◯</p>
            </div>
            <div className="py-2">
              <button className="text-white font-semibold h-8 w-32 mx-4 rounded-md hover:bg-green-600 text-xs bg-green-500">
                Post Comment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DetailArticle;
