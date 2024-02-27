export interface YoutubeResponse {
  kind:    string;
  etag:    string;
  id:      ID;
  snippet: Snippet;
}

export interface ID {
  kind:    string;
  videoId: string;
}

export interface Snippet {
  publishedAt:          string;
  channelId:            string;
  title:                string;
  description:          string;
  thumbnails:           Thumbnails;
  channelTitle:         string;
  liveBroadcastContent: string;
  publishTime:          string;
}

export interface Thumbnails {
  default: Thumbnail;
  medium:  Thumbnail;
  high:    Thumbnail;
}

export interface Thumbnail {
  url:    string;
  width:  number;
  height: number;
}
