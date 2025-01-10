import { Artifact } from "./Artifact";
import { User } from "./User";

export interface StashData {
  user:        User;
  length:      number;
  artifacts:   Artifact[];
  id:          string;
  created_at:  Date;
  modified_at: Date;
}