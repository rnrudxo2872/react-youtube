import { API_KEY } from "./env";

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
