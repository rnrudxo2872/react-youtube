import { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { getNextVideos, getPopularVideos } from "../api";
import PopularVideo from "../components/popularVideo";
import { IVideoDetail } from "../interfaces/watch.interface";
import styles from "../styles/home.module.css";

export default function Home() {
  const { data, isLoading } = useQuery<IVideoDetail>(["home", "popular"], () =>
    getPopularVideos()
  );
  const [NextVideo, setNextVideo] = useState<IVideoDetail[]>();
  let nextToken = useRef("");
  useEffect(() => {
    const observer = () => {
      const obs = new IntersectionObserver(setNextVideos);
      obs.observe(getPageBottom());
    };
    if (!isLoading) {
      nextToken.current = data!.nextPageToken;
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
        const next = await getNextVideos(nextToken.current);
        setNextVideo((cur) => (cur ? [...cur, next] : [next]));
        nextToken.current = next.nextPageToken;
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
        ? NextVideo.reduce((prev, cur) => {
            const item = cur.items.map((video) => (
              <PopularVideo key={video.id} {...video} />
            ));
            return [...prev, ...item];
          }, [] as JSX.Element[])
        : "now Loading..."}
      <section className="page-bottom"></section>
    </div>
  );
}
