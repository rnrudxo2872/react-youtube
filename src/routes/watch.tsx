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
                <div className={styles["remote-container"]}>
                  <button className={`${styles["like__btn"]} ${styles.btn}`}>
                    <svg
                      style={{ display: "none" }}
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="thumbs-up"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="currentColor"
                        d="M104 224H24c-13.255 0-24 10.745-24 24v240c0 13.255 10.745 24 24 24h80c13.255 0 24-10.745 24-24V248c0-13.255-10.745-24-24-24zM64 472c-13.255 0-24-10.745-24-24s10.745-24 24-24 24 10.745 24 24-10.745 24-24 24zM384 81.452c0 42.416-25.97 66.208-33.277 94.548h101.723c33.397 0 59.397 27.746 59.553 58.098.084 17.938-7.546 37.249-19.439 49.197l-.11.11c9.836 23.337 8.237 56.037-9.308 79.469 8.681 25.895-.069 57.704-16.382 74.757 4.298 17.598 2.244 32.575-6.148 44.632C440.202 511.587 389.616 512 346.839 512l-2.845-.001c-48.287-.017-87.806-17.598-119.56-31.725-15.957-7.099-36.821-15.887-52.651-16.178-6.54-.12-11.783-5.457-11.783-11.998v-213.77c0-3.2 1.282-6.271 3.558-8.521 39.614-39.144 56.648-80.587 89.117-113.111 14.804-14.832 20.188-37.236 25.393-58.902C282.515 39.293 291.817 0 312 0c24 0 72 8 72 81.452z"
                      ></path>
                    </svg>
                    <div className={styles["like__icon"]}>
                      <svg
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="far"
                        data-icon="thumbs-up"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path
                          fill="currentColor"
                          d="M466.27 286.69C475.04 271.84 480 256 480 236.85c0-44.015-37.218-85.58-85.82-85.58H357.7c4.92-12.81 8.85-28.13 8.85-46.54C366.55 31.936 328.86 0 271.28 0c-61.607 0-58.093 94.933-71.76 108.6-22.747 22.747-49.615 66.447-68.76 83.4H32c-17.673 0-32 14.327-32 32v240c0 17.673 14.327 32 32 32h64c14.893 0 27.408-10.174 30.978-23.95 44.509 1.001 75.06 39.94 177.802 39.94 7.22 0 15.22.01 22.22.01 77.117 0 111.986-39.423 112.94-95.33 13.319-18.425 20.299-43.122 17.34-66.99 9.854-18.452 13.664-40.343 8.99-62.99zm-61.75 53.83c12.56 21.13 1.26 49.41-13.94 57.57 7.7 48.78-17.608 65.9-53.12 65.9h-37.82c-71.639 0-118.029-37.82-171.64-37.82V240h10.92c28.36 0 67.98-70.89 94.54-97.46 28.36-28.36 18.91-75.63 37.82-94.54 47.27 0 47.27 32.98 47.27 56.73 0 39.17-28.36 56.72-28.36 94.54h103.99c21.11 0 37.73 18.91 37.82 37.82.09 18.9-12.82 37.81-22.27 37.81 13.489 14.555 16.371 45.236-5.21 65.62zM88 432c0 13.255-10.745 24-24 24s-24-10.745-24-24 10.745-24 24-24 24 10.745 24 24z"
                        ></path>
                      </svg>
                    </div>
                    <span className={styles["like__counts"]}>
                      {videoData?.items[0].statistics.likeCount}
                    </span>
                  </button>
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
