import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { searchVideos } from "../api";
import { ISearchVideo } from "../interfaces/search.interface";
import ResultVideo from "../components/resultVideo";
import Head from "../components/head";
import { getURLParams } from "../utiles/utiles";

export default function Search() {
  const { search } = useLocation();
  const { isLoading, data } = useQuery<ISearchVideo>(
    ["search", `${getURLParams(search, "terms")}`],
    () => searchVideos(getURLParams(search, "terms") ?? "")
  );

  return (
    <div>
      <Head title={getURLParams(search, "terms")} />
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
