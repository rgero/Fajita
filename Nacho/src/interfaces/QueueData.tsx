import { Interaction } from "./Interaction";
import { Owner } from "./Owner";

export interface QueueData {
  owner?:               Owner;
  owner_id?:            string;
  contributors?:        Owner[];
  length?:              number;
  interactions?:        Interaction[];
  current_interaction?: Interaction | null;
  next_interaction?:    Interaction | null;
  previous_interaction?: Interaction | null;
  id?:                  string;
  title?:               string;
  description?:         string;
  topic?:               string;
  max_index?:           number;
  locked?:              boolean;
  private?:             boolean;
  current_index?:       number;
  created_at?:          string;
  modified_at?:         string;
}