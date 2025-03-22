export interface YoutubeResponse {
  id:            string;
  title:         string;
  thumbnail_src: string;
  views?:        string;
  author?:        string;
  duration:       string|number;
  resultType?:    string;
  accountType?:   string;
}
