import { memo } from "react";
import { useQuery } from "react-query";
import { IComments } from "../interfaces/watch.interface";
import { getLater } from "../utiles/utiles";
import styles from "../styles/watch.module.css";
import { useRecoilValue } from "recoil";
import { youtubeAtom } from "../atoms/youtube";

function VideoComments({ videoId }: { videoId: string }) {
  const youtube = useRecoilValue(youtubeAtom);
  const { data, isLoading } = useQuery<IComments>(
    ["video", videoId, "comments"],
    () => youtube.getCommentThread(videoId)
  );

  return (
    <>
      {isLoading ? (
        "loading..."
      ) : (
        <div>
          {data?.items.map((item) => {
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
    </>
  );
}

export default memo(VideoComments);
