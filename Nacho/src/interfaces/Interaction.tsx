import { Owner } from "./Owner";

export interface Interaction {
  user:        Owner;
  video:       Video;
  youtube_id:  string;
  id:          string;
  index:       number;
  priority:    number;
  created_at:  Date;
  modified_at: Date;
  visibility:  number;
  played:      boolean;
}

export interface Video {
  id:        number;
  title:     string;
  video_id:  string;
  thumbnail: string;
  duration:  number;
}
