import { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import { youtubeAtom } from "../atoms/youtube";
import PopularVideo from "../components/popularVideo";
import { IVideoDetail } from "../interfaces/watch.interface";
import styles from "../styles/home.module.css";

export default function Home() {
  const youtube = useRecoilValue(youtubeAtom);
  const { data, isLoading } = useQuery<IVideoDetail>(["home", "popular"], () =>
    youtube.getPopularVideos()
  );
  const [NextVideo, setNextVideo] = useState<IVideoDetail[]>();
  const nextToken = useRef("");
  const pageBottom = useRef<HTMLElement>(null);
  useEffect(() => {
    const observer = () => {
      const obs = new IntersectionObserver(setNextVideos);
      if (!pageBottom.current)
        throw new Error("page bottom class element does not exist.");
      obs.observe(pageBottom.current);
    };
    if (!isLoading) {
      nextToken.current = data!.nextPageToken;
      observer();
    }
  }, [data, isLoading]);
  const setNextVideos = (entries: IntersectionObserverEntry[]) => {
    entries.forEach(async (entry) => {
      if (entry.isIntersecting) {
        const next = await youtube.getNextVideos(nextToken.current);
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
      <section className="page-bottom" ref={pageBottom}></section>
    </div>
  );
}
