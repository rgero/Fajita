import { Video } from "./Interaction";

export interface Stash {
  id:          string;
  modified_at: Date;
}

export interface Artifact {
  video:       Video;
  stash:       Stash;
  id:          string;
  text:        string;
  created_at:  Date;
  modified_at: Date;
}