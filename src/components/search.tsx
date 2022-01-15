import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { searchVideos } from "../api";
import { ISearchVideo } from "../interfaces/search.interface";
import ResultVideo from "./resultVideo";

export default function Search() {
  const { search } = useLocation();
  const getSearchParam = (search: string) =>
    new URLSearchParams(search).get("terms");
  const { isLoading, data } = useQuery<ISearchVideo>(
    ["search", `${getSearchParam(search)}`],
    () => searchVideos(getSearchParam(search) ?? "")
  );
  console.log(data?.items);
  return (
    <div>
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
