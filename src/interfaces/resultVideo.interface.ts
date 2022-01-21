import { IPageInfo, IYouTubeBase } from "./interfaces";
import { Thumbnails } from "./search.interface";

export interface ChennalInfo {
  kind: string;
  etag: string;
  pageInfo: IPageInfo;
  items: ChennalItem[];
}

interface ChennalItem extends IYouTubeBase {
  id: string;
  snippet: {
    title: string;
    description: string;
    publishedAt: string;
    thumbnails: Thumbnails;
    localized: {
      title: string;
      description: string;
    };
    country: string;
  };
}
