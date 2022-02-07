import { memo } from "react";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import { youtubeAtom } from "../atoms/youtube";
import { IVideoDetail } from "../interfaces/watch.interface";
import styles from "../styles/relatedVideos.module.css";
import RelatedVideo from "./relatedVideo";

function RelatedVideos({ videoId }: { videoId: string }) {
  const youtube = useRecoilValue(youtubeAtom);
  const { data, isLoading } = useQuery<IVideoDetail>(
    ["video", videoId, "related"],
    () => youtube.getRelatedVideos(videoId)
  );
  if (!isLoading) console.log(data);

  return (
    <>
      {isLoading ? (
        "Loading..."
      ) : (
        <div className={styles["relate-list"]}>
          {data!.items
            .filter((video) => video.snippet)
            .map((video) => (
              <RelatedVideo key={video.id} {...video} />
            ))}
        </div>
      )}
    </>
  );
}

export default memo(RelatedVideos);
