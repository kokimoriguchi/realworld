import { useEffect, useState } from "react";
import baseAxios from "../hooks/axios";
import { useNavigate } from "react-router-dom";

const LoginHome = () => {
  const [allArticles, setAllArticles] = useState([]);
  const navigate = useNavigate();

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

  const handleDetailArticle = (article) => {
    navigate(`/detailArticle/${article.id}`);
  };

  return (
    <div>
      <div className="bg-green-500 h-40 flex flex-col justify-center items-center text-white">
        <div className="text-4xl">conduit</div>
        <p className="text-lg">A place to share your knowledge.</p>
      </div>
      <div className="mx-28 pt-10">
        <div className="h-screen grid grid-cols-5">
          <div className="col-span-4">
            <div className="flex w-">
              <p className="pr-5">Your Feed</p>
              <p>Global Feed</p>
            </div>
            <hr />
            {allArticles.map((article, index) => (
              <div key={index}>
                <div className="pb-3">
                  <p>{article.user_id}</p>
                </div>
                <div
                  className="h-40 cursor-pointer"
                  onClick={() => handleDetailArticle(article)}
                >
                  <p>{article.body}</p>
                </div>
                <hr />
              </div>
            ))}
          </div>
          <div className="col-span-1">
            <div className="h-40 bg-slate-400 bg-opacity-20 rounded-md ml-6">
              <p>Popular Tags</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginHome;
