import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getNextVideos, getPopularVideos } from "../api";
import PopularVideo from "../components/popularVideo";
import { IVideoDetail } from "../interfaces/watch.interface";
import styles from "../styles/home.module.css";

export default function Home() {
  const { data, isLoading } = useQuery<IVideoDetail>(["home", "popular"], () =>
    getPopularVideos()
  );
  const [NextVideo, setNextVideo] = useState<IVideoDetail>();
  const [nextToken, setNextToken] = useState("");
  useEffect(() => {
    const observer = () => {
      const obs = new IntersectionObserver(setNextVideos);
      obs.observe(getPageBottom());
    };
    if (!isLoading) {
      setNextToken(data!.nextPageToken);
      observer();
    }
  }, [isLoading]);
  const getPageBottom = () => {
    const result = document.querySelector(".page-bottom");
    if (!result) throw new Error("page-bottom does not exist.");
    return result;
  };
  const setNextVideos = (entries: IntersectionObserverEntry[]) => {
    entries.forEach(async (entry) => {
      if (entry.isIntersecting) {
        const ee = await getNextVideos(nextToken);
        console.log(data, ee);
        setNextVideo(ee);
      }
    });
  };

  return (
    <div className={styles.root}>
      {isLoading
        ? "now Loading..."
        : data?.items.map((video) => (
            <PopularVideo key={video.id} {...video} />
          ))}
      {NextVideo
        ? NextVideo.items.map((video) => (
            <PopularVideo key={video.id} {...video} />
          ))
        : "now Loading..."}
      <section className="page-bottom"></section>
    </div>
  );
}
