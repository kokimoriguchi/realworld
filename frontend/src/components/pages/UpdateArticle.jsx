import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import baseAxios from "../hooks/axios";
import { useNavigate } from "react-router-dom";

const UpdateArticle = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState("");
  const [tagList, setTagList] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getUpdateArticle = async () => {
      try {
        const response = await baseAxios.get(`api/articles/${id}`);
        const responseData = response.data.article;
        // useEffect内で各stateを更新することでinput内の表示を可能にしている。または空文字を入れておかないと注意が出る。
        setTitle(responseData.title || "");
        setDescription(responseData.description || "");
        setBody(responseData.body || "");
        setTagList(responseData.tag_list || "");
      } catch (error) {
        console.log(error);
      }
    };
    getUpdateArticle();
  }, [id]);

  const handleUpdateArticle = async (e) => {
    e.preventDefault();
    const updateData = {
      title: title,
      description: description,
      body: body,
      tag_list: tagList,
    };

    try {
      await baseAxios.patch(`/api/articles/${id}`, {
        article: { ...updateData },
      });
    } catch (error) {
      console.log(error);
    }
    setTitle("");
    setDescription("");
    setBody("");
    setTagList("");
    navigate(`/detailArticle/${id}`);
  };

  return (
    <div>
      <div className="">
        <div className=" w-full flex flex-col items-center justify-center mt-6">
          <form
            className="w-full flex flex-col items-center"
            onSubmit={handleUpdateArticle}
          >
            <div className="pb-4 w-screen justify-center flex">
              <input
                className="w-3/5 border-slate-200 rounded-md h-12 border-2"
                type="text"
                value={title}
                placeholder="Article Title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="pb-4 w-screen justify-center flex">
              <input
                className=" w-3/5 border-slate-200 rounded-md h-12 border-2"
                type="text"
                value={description}
                placeholder="What's this article about?"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="pb-4 w-screen justify-center flex">
              <input
                className="w-3/5 border-slate-200 rounded-md h-52 border-2"
                type="text"
                value={body}
                placeholder="Write your article (in markdown)"
                onChange={(e) => {
                  setBody(e.target.value);
                }}
              />
            </div>
            <div className="pb-4 w-screen justify-center flex">
              <input
                className="w-3/5 border-slate-200 rounded-md h-12 border-2"
                type="text"
                value={tagList}
                placeholder="Enter tags"
                onChange={(e) => setTagList(e.target.value)}
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

export default UpdateArticle;
