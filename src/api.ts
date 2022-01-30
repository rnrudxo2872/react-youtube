import { API_KEY } from "./env";
import { IVideoDetail } from "./interfaces/watch.interface";

const END_POINT = "https://youtube.googleapis.com/youtube/v3";

export async function searchVideos(term: string) {
  return await (
    await fetch(
      `${END_POINT}/search?part=snippet&maxResults=20&order=viewCount&q=${term}&type=video&videoDefinition=high&key=${API_KEY}`
    )
  ).json();
}

export async function getChannelInfo(id: string) {
  return await (
    await fetch(`${END_POINT}/channels?part=snippet&id=${id}&key=${API_KEY}`)
  ).json();
}

export async function getPopularVideos() {
  return await (
    await fetch(
      `${END_POINT}/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=20&key=${API_KEY}&regionCode=KR`
    )
  ).json();
}

export async function getVideoDetail(id: string) {
  return await (
    await fetch(
      `${END_POINT}/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${id}&key=${API_KEY}`
    )
  ).json();
}

export async function getCommentThread(videoId: string) {
  return await (
    await fetch(
      `${END_POINT}/commentThreads?part=snippet&key=${API_KEY}&textFormat=html&videoId=${videoId}&maxResult=20`
    )
  ).json();
}

export async function getNextVideos(nextToken: string): Promise<IVideoDetail> {
  console.log(
    `fetch data url -> `,
    `${END_POINT}/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=20&key=${API_KEY}&regionCode=KR&pageToken=${nextToken}`
  );
  return await (
    await fetch(
      `${END_POINT}/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=20&key=${API_KEY}&regionCode=KR&pageToken=${nextToken}`
    )
  ).json();
}
