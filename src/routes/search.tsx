import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { searchVideos } from "../api";
import { ISearchVideo } from "../interfaces/search.interface";
import ResultVideo from "../components/resultVideo";
import Head from "../components/head";

export default function Search() {
  const { search } = useLocation();
  const getSearchParam = () => {
    const result = new URLSearchParams(search).get("terms");
    if (!result) throw new Error("wrong url parameter!");

    return result;
  };
  const { isLoading, data } = useQuery<ISearchVideo>(
    ["search", `${getSearchParam()}`],
    () => searchVideos(getSearchParam() ?? "")
  );
  console.log(data?.items);
  return (
    <div>
      <Head title={getSearchParam()} />
      {isLoading ? (
        "loading..."
      ) : data?.items ? (
        data?.items.map((item) => (
          <ResultVideo key={item.id.videoId} {...item} />
        ))
      ) : (
        <h1>{"no data!"}</h1>
      )}
    </div>
  );
}
