import styles from "../styles/resultVideo.module.css";
import { Item } from "../interfaces/search.interface";
import { useQuery } from "react-query";
import { ChennalInfo } from "../interfaces/resultVideo.interface";
import { useRecoilValue } from "recoil";
import { youtubeAtom } from "../atoms/youtube";
import { DparserAtom } from "../atoms/domParser";

export default function ResultVideo(props: Item) {
  const {
    snippet,
    id: { videoId },
  } = props;
  const { title, thumbnails, channelId, channelTitle, description } = snippet;
  const { medium } = thumbnails;
  const parser = useRecoilValue(DparserAtom);
  const youtube = useRecoilValue(youtubeAtom);
  const { isLoading, data } = useQuery<ChennalInfo>(
    ["chennel", `${channelId}`],
    () => youtube.getChannelInfo(channelId)
  );

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
              <h1>{parser.htmlToText(title)}</h1>
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
