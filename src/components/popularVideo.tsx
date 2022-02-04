import { MouseEvent, useRef } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { youtubeAtom } from "../atoms/youtube";
import { ChennalInfo } from "../interfaces/resultVideo.interface";
import { DetailItem } from "../interfaces/watch.interface";
import styles from "../styles/popularVideo.module.css";
import { getFormattedCounts, getLater } from "../utiles/utiles";

export default function PopularVideo(props: DetailItem) {
  const { id, snippet, statistics } = props;
  const {
    thumbnails: { medium },
    title,
    channelId,
    channelTitle,
    publishedAt,
  } = snippet;
  const { viewCount } = statistics;
  const parser = new DOMParser();
  const youtube = useRecoilValue(youtubeAtom);
  const { isLoading, data } = useQuery<ChennalInfo>(
    ["chennel", `${channelId}`],
    () => youtube.getChannelInfo(channelId)
  );
  const channelRef = useRef<HTMLDivElement>(null);
  const pageNavigate = useNavigate();
  const onClickVideo = (event: MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;
    const except =
      target.closest<HTMLDivElement>(`.${styles["chennal-title"]}`) ??
      target.closest<HTMLDivElement>(`.${styles["chennal-img"]}`);
    if (except) {
      return;
    }
    pageNavigate(`/watch?v=${id}`);
  };

  return (
    <div className={styles.container} onClick={onClickVideo}>
      <section>
        <img
          src={medium.url}
          alt={`${title}의 thumbnail.`}
          width={"100%"}
          height={"auto"}
        />
      </section>
      <section className={styles["info-container"]}>
        <section className={styles["chennal-img"]}>
          {isLoading ? null : (
            <img
              src={data?.items[0].snippet.thumbnails.default.url}
              alt={`${data?.items[0].snippet.title} 채널 이미지`}
              width={
                (data?.items[0].snippet.thumbnails.default.width || 88) - 45
              }
              height={
                (data?.items[0].snippet.thumbnails.default.height || 88) - 45
              }
            />
          )}
        </section>
        <section className={styles["top-info"]}>
          <div className={styles["title-wrapper"]}>
            <h1>
              {parser.parseFromString(title, "text/html").body.textContent}
            </h1>
          </div>
          <div className={styles["chennal-title"]} ref={channelRef}>
            <a href={`https://www.youtube.com/channel/${channelId}`}>
              <span>{channelTitle}</span>
            </a>
          </div>
          <div className={styles["video-info"]}>
            <span>조회수 {getFormattedCounts(viewCount)}</span>
            <span> • {getLater(publishedAt)}</span>
          </div>
        </section>
      </section>
    </div>
  );
}
