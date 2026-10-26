import { Video } from "./Interaction";
import { Owner } from "./Owner";

export interface Artifact {
  video:       Video;
  user?:       Owner;
  id:          string;
  text?:       string | null;
  created_at:  string;
  modified_at?: string | null;
}