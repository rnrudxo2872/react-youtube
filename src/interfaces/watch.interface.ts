import { Thumbnail } from "./search.interface";

export interface IVideoDetail {
  kind: string;
  etag: string;
  items: DetailItem[];
  pageInfo: PageInfo;
}

interface PageInfo {
  totalResults: number;
  resultsPerPage: number;
}

interface DetailItem {
  kind: string;
  etag: string;
  id: string;
  snippet: DetailSnippets;
  contentDetails: ContentDetails;
  statistics: Statistics;
}

interface DetailSnippets {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: Thumbnail;
  channelTitle: string;
  categoryId: string;
  liveBroadcastContent: string;
  localized: Localized;
  defaultAudioLanguage: string;
}

interface Localized {
  title: string;
  description: string;
}

interface ContentDetails {
  duration: string;
  dimension: string;
  definition: string;
  caption: string;
  licensedContent: boolean;
  contentRating: any;
  projection: string;
}

interface Statistics {
  viewCount: string;
  likeCount: string;
  favoriteCount: string;
  commentCount: string;
}
