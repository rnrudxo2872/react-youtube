import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { getCommentThread, getVideoDetail } from "../api";
import Head from "../components/head";
import { IComments, IVideoDetail } from "../interfaces/watch.interface";
import styles from "../styles/watch.module.css";
import { getURLParams } from "../utiles/utiles";

export default function Watch() {
  const { search } = useLocation();
  const { data: videoData, isLoading: videoLoading } = useQuery<IVideoDetail>(
    ["video", getURLParams(search, "v")],
    () => getVideoDetail(getURLParams(search, "v"))
  );
  const { data: commentsData, isLoading: commentsLoading } =
    useQuery<IComments>(["video", getURLParams(search, "v"), "comments"], () =>
      getCommentThread(getURLParams(search, "v"))
    );
  const getTitle = () => {
    if (!videoData) throw new Error("video data does not exist.");
    return videoData.items[0].snippet.title;
  };
  const getViewCount = () => {
    if (!videoData) throw new Error("video data does not exist.");
    const result = videoData.items[0].statistics.viewCount;
    return Number(result).toLocaleString("ko-KR");
  };
  const getPublishedAt = () => {
    if (!videoData) throw new Error("video data does not exist.");
    const date = new Date(videoData.items[0].snippet.publishedAt);
    return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`;
  };
  const getDescrition = () => {
    if (!videoData) throw new Error("video data does not exist.");
    return videoData.items[0].snippet.description;
  };
  console.log(commentsData);
  return (
    <>
      <Head title={videoLoading ? "Video" : getTitle()} />
      <div className={styles.container}>
        <div className={styles.main}>
          <div className={styles.player}>
            <iframe
              src={`https://www.youtube.com/embed/${getURLParams(
                search,
                "v"
              )}?autoplay=1`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen;"
            ></iframe>
          </div>
          {videoLoading ? (
            "loading..."
          ) : (
            <div className={styles["video-info"]}>
              <div className={styles.title}>
                <h1>{getTitle()}</h1>
              </div>
              <div className={styles.info}>
                <div className={styles["info-top"]}>
                  <span
                    className={styles.viewCount}
                  >{`조회수 ${getViewCount()}회 `}</span>
                  <span
                    className={styles.date}
                  >{` • ${getPublishedAt()} • `}</span>
                </div>
                <div className={styles.description}>
                  <span>{getDescrition()}</span>
                </div>
              </div>
            </div>
          )}
          {commentsLoading ? (
            "loading..."
          ) : (
            <div>
              {commentsData?.items.map((item: any) => (
                <div style={{ fontSize: "1.2rem", lineHeight: "2rem" }}>
                  {item.snippet.topLevelComment.snippet.textOriginal}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className={styles["relate-list"]}>sc</div>
      </div>
    </>
  );
}
