import { Artifact } from "./Artifact";
import { Owner } from "./Owner";

export interface StashData {
  owner?:      Owner;
  length?:     number;
  artifacts?:  Artifact[];
  id?:         string;
  created_at?: string;
  modified_at?: string;
}