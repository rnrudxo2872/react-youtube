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
  const getLater = (value: string | number) => {
    const today = new Date();
    const timeValue = new Date(value);

    const seconds = Math.floor((today.getTime() - timeValue.getTime()) / 1000);
    if (seconds < 5) return "방금전";
    if (seconds < 60) {
      return `${seconds}초전`;
    }

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
      return `${minutes}분전`;
    }

    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
      return `${hours}시간전`;
    }

    const days = Math.floor(hours / 24);
    if (days < 31) {
      return `${days}일전`;
    }

    const months = Math.floor(days / 30);
    if (months < 12) {
      return `${months}달전`;
    }

    return `${Math.floor(days / 365)}년전`;
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
              {commentsData?.items.map((item) => {
                const {
                  snippet: {
                    topLevelComment: { snippet },
                  },
                } = item;
                return (
                  <div className={styles["comment-container"]} key={item.id}>
                    <section className={styles["author-thumbnail"]}>
                      <div className={styles["thumbnail__image"]}>
                        <img
                          src={snippet.authorProfileImageUrl}
                          alt={`${snippet.authorDisplayName}의 프로필 이미지`}
                        />
                      </div>
                    </section>
                    <section className={styles["comment-main"]}>
                      <div className={styles.head}>
                        <span className={styles["author-name"]}>
                          {snippet.authorDisplayName}
                        </span>
                        <span className={styles["published-date"]}>
                          {getLater(snippet.publishedAt)}
                        </span>
                      </div>
                      <div className={styles.body}>
                        <span>{snippet.textOriginal}</span>
                      </div>
                    </section>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div className={styles["relate-list"]}>sc</div>
      </div>
    </>
  );
}
