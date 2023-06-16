import { useRef, useContext } from "react";
import { AuthContext } from "../hooks/Auth";
import baseAxios from "../hooks/axios";
import { useNavigate } from "react-router-dom";

const Article = () => {
  const articleTitleRef = useRef();
  const articleDescriptionRef = useRef();
  const articleBodyRef = useRef();
  const articleTagRef = useRef();
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  const backHome = () => {
    navigate("/loginHome");
  };

  const CreateArticle = async (e) => {
    e.preventDefault();
    const articleData = {
      title: articleTitleRef.current.value,
      description: articleDescriptionRef.current.value,
      body: articleBodyRef.current.value,
      user_id: auth.user.id,
    };
    console.log(articleData);

    try {
      const response = await baseAxios.post("/api/articles", {
        article: { ...articleData },
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
    articleTitleRef.current.value = "";
    articleDescriptionRef.current.value = "";
    articleBodyRef.current.value = "";
    backHome();
  };
  return (
    <div>
      <div className="">
        <div className=" w-full flex flex-col items-center justify-center mt-6">
          <form
            onSubmit={CreateArticle}
            className="w-full flex flex-col items-center"
          >
            <div className="pb-4 w-screen justify-center flex">
              <input
                className="w-3/5 border-slate-200 rounded-md h-12 border-2"
                type="text"
                placeholder="Article Title"
                ref={articleTitleRef}
              />
            </div>
            <div className="pb-4 w-screen justify-center flex">
              <input
                className=" w-3/5 border-slate-200 rounded-md h-12 border-2"
                type="text"
                placeholder="What's this article about?"
                ref={articleDescriptionRef}
              />
            </div>
            <div className="pb-4 w-screen justify-center flex">
              <input
                className="w-3/5 border-slate-200 rounded-md h-52 border-2"
                type="text"
                placeholder="Write your article (in markdown)"
                ref={articleBodyRef}
              />
            </div>
            <div className="pb-4 w-screen justify-center flex">
              <input
                className="w-3/5 border-slate-200 rounded-md h-12 border-2"
                type="text"
                placeholder="Enter tags"
                ref={articleTagRef}
              />
            </div>

            <div className="flex flex-row-reverse">
              <button
                className="w-48 text-white bg-green-500 border-slate-200 rounded-md h-14 text-lg border-2"
                type="submit"
              >
                Publish Article
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Article;
