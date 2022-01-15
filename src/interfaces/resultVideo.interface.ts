import { Thumbnails } from "./search.interface";

export interface ChennalInfo {
  kind: string;
  etag: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: ChennalItem[];
}

interface ChennalItem {
  kind: string;
  etag: string;
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
