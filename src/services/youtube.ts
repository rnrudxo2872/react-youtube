import { API_KEY } from "../env";
import { IVideoDetail } from "../interfaces/watch.interface";

export default class Youtube {
  END_POINT = "https://youtube.googleapis.com/youtube/v3";

  async searchVideos(term: string) {
    return await (
      await fetch(
        `${this.END_POINT}/search?part=snippet&maxResults=20&order=viewCount&q=${term}&type=video&videoDefinition=high&key=${API_KEY}`
      )
    ).json();
  }

  async getChannelInfo(id: string) {
    return await (
      await fetch(
        `${this.END_POINT}/channels?part=snippet&id=${id}&key=${API_KEY}`
      )
    ).json();
  }

  async getPopularVideos() {
    return await (
      await fetch(
        `${this.END_POINT}/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=20&key=${API_KEY}&regionCode=KR`
      )
    ).json();
  }

  async getVideoDetail(id: string) {
    return await (
      await fetch(
        `${this.END_POINT}/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${id}&key=${API_KEY}`
      )
    ).json();
  }

  async getCommentThread(videoId: string) {
    return await (
      await fetch(
        `${this.END_POINT}/commentThreads?part=snippet&key=${API_KEY}&textFormat=html&videoId=${videoId}&maxResult=20`
      )
    ).json();
  }

  async getNextVideos(nextToken: string): Promise<IVideoDetail> {
    return await (
      await fetch(
        `${this.END_POINT}/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=20&key=${API_KEY}&regionCode=KR&pageToken=${nextToken}`
      )
    ).json();
  }

  async getRelatedVideos(videoId: string): Promise<any> {
    return await (
      await fetch(
        `${this.END_POINT}/search?part=snippet&type=video&relatedToVideoId=${videoId}&key=${API_KEY}&maxResults=20`
      )
    ).json();
  }
}
