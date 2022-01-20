import { useQuery } from "react-query";
import { getPopularVideos } from "../api";
import ResultVideo from "../components/resultVideo";
import { ISearchVideo } from "../interfaces/search.interface";

export default function Home() {
  const { data, isLoading } = useQuery<ISearchVideo>(["home", "popular"], () =>
    getPopularVideos()
  );

  return (
    <div>
      {isLoading
        ? "now Loading..."
        : data?.items.map((video) => <ResultVideo {...video} />)}
    </div>
  );
}
