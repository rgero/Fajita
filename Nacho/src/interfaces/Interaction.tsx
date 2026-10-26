import { Owner } from "./Owner";

export interface Interaction {
  user:        Owner;
  video:       Video;
  id:          string;
  index:       number;
  priority:    number;
  created_at?: string;
  modified_at?: string | null;
  visibility:  number;
  played_at:   string | null;
  play_count:  number;
}

export interface Video {
  id:           string;
  title?:       string;
  thumbnail?:   string;
  duration?:    number;
  channelId?:   string;
  channelTitle?: string;
  categoryId?:  number;
  created_at?:  string;
  modified_at?: string;
}
