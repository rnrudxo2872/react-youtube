import { useQuery } from "react-query";
import { getPopularVideos } from "../api";
import PopularVideo from "../components/popularVideo";
import { IVideoDetail } from "../interfaces/watch.interface";

export default function Home() {
  const { data, isLoading } = useQuery<IVideoDetail>(["home", "popular"], () =>
    getPopularVideos()
  );
  console.log(data, "home");
  return (
    <div>
      {isLoading
        ? "now Loading..."
        : data?.items.map((video) => (
            <PopularVideo key={video.id} {...video} />
          ))}
    </div>
  );
}
