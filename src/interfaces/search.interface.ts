export interface ISearchVideo {
  kind: string;
  etag: string;
  nextPageToken: string;
  regionCode: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: item[];
  // {
  //   kind: youtube#searchResult,
  //   etag: QfVmWE1VlaG9cgfPLBIhkYAsnvk,
  //   id: {
  //     kind: youtube#video,
  //     videoId: EVnzXA9b7Ww
  //   },
  //   snippet: {
  //     publishedAt: 2015-11-12T10:27:34Z,
  //     channelId: UCeSRjhfeeqIgr--AcP9qhyg,
  //     title: Otto the skateboarding bulldog - Guinness World Records,
  //     description: Subscribe for more || http://bit.ly/GWR-Subscribe ▻ Watch the GWR's Favourites || http://bit.ly/GWR-Favs The longest human ...,
  //     thumbnails: {
  //       default: {
  //         url: https://i.ytimg.com/vi/EVnzXA9b7Ww/default.jpg,
  //         width: 120,
  //         height: 90
  //       },
  //       medium: {
  //         url: https://i.ytimg.com/vi/EVnzXA9b7Ww/mqdefault.jpg,
  //         width: 320,
  //         height: 180
  //       },
  //       high: {
  //         url: https://i.ytimg.com/vi/EVnzXA9b7Ww/hqdefault.jpg,
  //         width: 480,
  //         height: 360
  //       }
  //     },
  //     channelTitle: Guinness World Records,
  //     liveBroadcastContent: none,
  //     publishTime: 2015-11-12T10:27:34Z
  //   }
  // }
}

interface item {
  kind: string;
  etag: string;
  id: ItemID;
  snippet: Snippet;
}

interface ItemID {
  kind: string;
  videoId: string;
}

interface Snippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: object;
  channelTitle: string;
  liveBroadcastContent: string;
  publishTime: string;
}
