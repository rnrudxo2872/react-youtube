import { memo, MouseEvent } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { DparserAtom } from "../atoms/domParser";
import { youtubeAtom } from "../atoms/youtube";
import { ChennalInfo } from "../interfaces/resultVideo.interface";
import { DetailItem } from "../interfaces/watch.interface";
import styles from "../styles/popularVideo.module.css";
import { getFormattedCounts, getLater } from "../utiles/utiles";

function PopularVideo(props: DetailItem) {
  const { id, snippet, statistics } = props;
  const {
    thumbnails: { medium },
    title,
    channelId,
    channelTitle,
    publishedAt,
  } = snippet;
  const { viewCount } = statistics;
  const parser = useRecoilValue(DparserAtom);
  const youtube = useRecoilValue(youtubeAtom);
  const { isLoading, data } = useQuery<ChennalInfo>(
    ["chennel", `${channelId}`],
    () => youtube.getChannelInfo(channelId)
  );
  const pageNavigate = useNavigate();
  const onClickVideo = (event: MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;
    const except =
      target.closest<HTMLDivElement>(`.${styles["chennal-title"]}`) ??
      target.closest<HTMLDivElement>(`.${styles["chennal-img"]}`) ??
      target.closest<HTMLElement>(`.${styles["thumbnail-wrapper"]}`) ??
      target.closest<HTMLElement>(`.${styles["title-wrapper"]}`);

    if (except) {
      return;
    }
    pageNavigate(`/watch?v=${id}`);
  };

  return (
    <div className={styles.container} onClick={onClickVideo}>
      <section className={styles["thumbnail-wrapper"]}>
        <Link to={`/watch?v=${id}`}>
          <img
            src={medium.url}
            alt={`${title}의 thumbnail.`}
            width={"100%"}
            height={"auto"}
          />
        </Link>
      </section>
      <section className={styles["info-container"]}>
        <section className={styles["chennal-img"]}>
          {isLoading ? null : (
            <a href={`https://www.youtube.com/channel/${channelId}`}>
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
            </a>
          )}
        </section>
        <section className={styles["top-info"]}>
          <div className={styles["title-wrapper"]}>
            <Link to={`/watch?v=${id}`}>
              <h1>{parser.htmlToText(title)}</h1>
            </Link>
          </div>
          <div className={styles["chennal-title"]}>
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

export default memo(PopularVideo);
