import { IPageInfo, IYouTubeBase } from "./interfaces";
import { Thumbnails } from "./search.interface";

export interface IVideoDetail extends IYouTubeBase {
  items: DetailItem[];
  pageInfo: IPageInfo;
  nextPageToken: string;
}

export interface DetailItem extends IYouTubeBase {
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
  thumbnails: Thumbnails;
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

export interface IComments extends IYouTubeBase {
  nextPageToken: string;
  pageInfo: IPageInfo;
  items: CommentItem[];
}

interface CommentItem extends IYouTubeBase {
  id: string;
  snippet: CommentSnippet;
}

interface CommentSnippet {
  videoId: string;
  topLevelComment: TopLevelComment;
  canReply: boolean;
  totalReplyCount: number;
  isPublic: boolean;
}

interface TopLevelComment {
  kind: string;
  etag: string;
  id: string;
  snippet: TopCommentSnippet;
}

interface TopCommentSnippet {
  videoId: string;
  textDisplay: string;
  textOriginal: string;
  authorDisplayName: string;
  authorProfileImageUrl: string;
  authorChannelUrl: string;
  authorChannelId: AuthorChannelId;
  canRate: boolean;
  viewerRating: string;
  likeCount: number;
  publishedAt: string;
  updatedAt: string;
}

interface AuthorChannelId {
  value: string;
}
