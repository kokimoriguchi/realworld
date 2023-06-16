import { useParams } from "react-router-dom";

const DetailArticle = () => {
  const { id } = useParams();
  return (
    <div>
      <div className="bg-black h-40 flex flex-col justify-center items-center text-white">
        <h1 className="text-4xl">conduit</h1>
        <div className="flex flex-row">
          <p className="text-lg">{id}</p>
        </div>
      </div>
    </div>
  );
};
export default DetailArticle;
