export interface YoutubeResponse {
  id:            string;
  title:         string;
  thumbnail_src: string;
  views?:        string;
  author?:        string;
  duration:       string;
  resultType?:    string;
  accountType?:   string;
}
