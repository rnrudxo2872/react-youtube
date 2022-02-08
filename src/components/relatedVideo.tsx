import { memo } from "react";
import { useRecoilValue } from "recoil";
import { DparserAtom } from "../atoms/domParser";
import { RelatedItem } from "../interfaces/watch.interface";
import styles from "../styles/relatedVideo.module.css";

function RelatedVideo({
  snippet: {
    thumbnails: { medium },
    title,
    channelTitle,
    channelId,
  },
  id,
  statistics,
}: RelatedItem) {
  const parser = useRecoilValue(DparserAtom);
  return (
    <div className={styles["video-wrapper"]}>
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
            <div className={styles["chennal-title"]}>
              <a href={`https://www.youtube.com/channel/${channelId}`}>
                <span>{channelTitle}</span>
              </a>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}

export default memo(RelatedVideo);
