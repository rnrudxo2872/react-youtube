import { memo } from "react";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import { youtubeAtom } from "../atoms/youtube";

function RelatedVideo({ videoId }: { videoId: string }) {
  const youtube = useRecoilValue(youtubeAtom);
  const { data, isLoading } = useQuery(["video", videoId, "related"], () =>
    youtube.getRelatedVideos(videoId)
  );
  console.log("관련 영상 데이터 ==> ", data);
  return <></>;
}

export default memo(RelatedVideo);
