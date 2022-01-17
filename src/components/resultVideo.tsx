import styles from "../styles/resultVideo.module.css";
import { Item } from "../interfaces/search.interface";
import { useQuery } from "react-query";
import { getChannelInfo } from "../api";
import { ChennalInfo } from "../interfaces/resultVideo.interface";

export default function ResultVideo(props: Item) {
  const {
    snippet,
    id: { videoId },
  } = props;
  const { title, thumbnails, channelId, channelTitle, description } = snippet;
  const { medium } = thumbnails;
  const parser = new DOMParser();
  const { isLoading, data } = useQuery<ChennalInfo>(
    ["chennel", `${channelId}`],
    () => getChannelInfo(channelId)
  );

  console.log(props);

  return (
    <a href={`/watch?v=${videoId}`}>
      <div className={styles.container}>
        <section>
          <img
            src={medium.url}
            alt={`${title}의 thumbnail.`}
            width={medium.width}
            height={medium.height}
          />
        </section>
        <section className={styles["info-container"]}>
          <section className={styles["top-info"]}>
            <div className={styles["title-wrapper"]}>
              <h1>
                {parser.parseFromString(title, "text/html").body.textContent}
              </h1>
            </div>
            <div className={styles["chennal-wrapper"]}>
              <div className={styles["chennal-img"]}>
                {isLoading ? null : (
                  <img
                    src={data?.items[0].snippet.thumbnails.default.url}
                    alt={`${data?.items[0].snippet.title} 채널 이미지`}
                    width={
                      (data?.items[0].snippet.thumbnails.default.width || 88) -
                      45
                    }
                    height={
                      (data?.items[0].snippet.thumbnails.default.height || 88) -
                      45
                    }
                  />
                )}
              </div>
              <div className={styles["chennal-title"]}>
                <a href={`https://www.youtube.com/channel/${channelId}`}>
                  <span>{channelTitle}</span>
                </a>
              </div>
            </div>
          </section>
          <div className={styles["description-wrapper"]}>
            <span>{`${description}`}</span>
          </div>
        </section>
      </div>
    </a>
  );
}
