import styles from "../styles/resultVideo.module.css";
import { Item } from "../interfaces/search.interface";
import { useQuery } from "react-query";
import { getChannelInfo } from "../api";
import { ChennalInfo } from "../interfaces/resultVideo.interface";

export default function ResultVideo(props: Item) {
  const { snippet } = props;
  const { title, thumbnails, channelId, description } = snippet;
  const { medium } = thumbnails;
  const parser = new DOMParser();
  const { isLoading, data } = useQuery<ChennalInfo>(
    ["chennel", `${channelId}`],
    () => getChannelInfo(channelId)
  );
  if (!isLoading) console.log(`${snippet.channelTitle}의 정보 ==> `, data);

  return (
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
        <div>
          <h1>{parser.parseFromString(title, "text/html").body.textContent}</h1>
        </div>
        <div className={styles.chennal}>
          {isLoading ? null : (
            <img
              src={data?.items[0].snippet.thumbnails.default.url}
              alt={`${data?.items[0].snippet.title} 채널 이미지`}
              width={data?.items[0].snippet.thumbnails.default.width}
              height={data?.items[0].snippet.thumbnails.default.height}
            />
          )}
        </div>
        <div>{`${description.slice(0, 100)}...`}</div>
      </section>
    </div>
  );
}
