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
      <div className="bg-black bg-opacity-70 h-40 text-white">
        <h1 className="text-4xl py-8 pl-10">{showArticle.body}</h1>
        <div className="flex flex-row pl-10">
          <p>{showArticle.description}</p>
          {auth.user.id === showArticle.user_id ? (
            <>
              <button>✍️Edit Article</button>
              <button onClick={handleArticleDelete}>🗑️Delete Article</button>
            </>
          ) : (
            <>
              <button>favorite</button>
              <button>favorite</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default DetailArticle;
