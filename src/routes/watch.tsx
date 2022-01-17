import { useLocation } from "react-router-dom";

export default function Watch() {
  const { search } = useLocation();
  const getSearchParam = () => {
    const result = new URLSearchParams(search).get("v");
    if (!result) throw new Error("params does not exist.");

    return result;
  };

  return (
    <div>
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${getSearchParam()}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      ></iframe>
    </div>
  );
}
