import { useQuery } from "react-query";
import { getPopularVideos } from "../api";
import PopularVideo from "../components/popularVideo";
import { IVideoDetail } from "../interfaces/watch.interface";
import styles from "../styles/home.module.css";

export default function Home() {
  const { data, isLoading } = useQuery<IVideoDetail>(["home", "popular"], () =>
    getPopularVideos()
  );
  console.log(data, "home");
  return (
    <div className={styles.root}>
      {isLoading
        ? "now Loading..."
        : data?.items.map((video) => (
            <PopularVideo key={video.id} {...video} />
          ))}
    </div>
  );
}
