import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { getVideoDetail } from "../api";
import Head from "../components/head";
import { IVideoDetail } from "../interfaces/watch.interface";
import styles from "../styles/watch.module.css";

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
  const getViewCount = () => {
    if (!data) throw new Error("video data does not exist.");
    const result = data.items[0].statistics.viewCount;
    return Number(result).toLocaleString("ko-KR");
  };
  const getPublishedAt = () => {
    if (!data) throw new Error("video data does not exist.");
    const date = new Date(data.items[0].snippet.publishedAt);
    return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`;
  };
  const getDescrition = () => {
    if (!data) throw new Error("video data does not exist.");
    return data.items[0].snippet.description;
  };

  return (
    <>
      <Head title={isLoading ? "Video" : getTitle()} />
      <div className={styles.container}>
        <div className={styles.main}>
          <div className={styles.player}>
            <iframe
              src={`https://www.youtube.com/embed/${getSearchParam()}?autoplay=1`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen;"
            ></iframe>
          </div>
          {isLoading ? (
            "loading..."
          ) : (
            <div className={styles["video-info"]}>
              <div className={styles.title}>
                <h1>{getTitle()}</h1>
              </div>
              <div className={styles.description}>
                <span
                  className={styles.viewCount}
                >{`조회수 ${getViewCount()}회 `}</span>
                <span
                  className={styles.date}
                >{` • ${getPublishedAt()} • `}</span>
                <span>{getDescrition()}</span>
              </div>
            </div>
          )}
        </div>
        <div className={styles["relate-list"]}>sc</div>
      </div>
    </>
  );
}
