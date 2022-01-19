import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { getVideoDetail } from "../api";
import Head from "../components/head";
import { IVideoDetail } from "../interfaces/watch.interface";

export default function Watch() {
  const { search } = useLocation();
  const getSearchParam = () => {
    const result = new URLSearchParams(search).get("v");
    if (!result) throw new Error("params does not exist.");

    return result;
  };
  const { data, isLoading } = useQuery<IVideoDetail>(
    ["video", getSearchParam()],
    () => getVideoDetail(getSearchParam())
  );
  const getTitle = () => {
    if (!data) throw new Error("video data does not exist.");
    return data.items[0].snippet.title;
  };

  return (
    <div>
      <Head title={isLoading ? "Video" : getTitle()} />
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${getSearchParam()}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen;"
      ></iframe>
    </div>
  );
}
