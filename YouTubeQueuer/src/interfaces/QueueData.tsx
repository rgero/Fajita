import { Interaction } from "./Interaction";
import { Owner } from "./Owner";

export interface QueueData {
  owner:               Owner;
  contributors:        Owner[];
  length:              number;
  interactions:        Interaction[];
  current_interaction: Interaction;
  next_interaction:    Interaction;
  id:                  number;
  active:              boolean;
  locked:              boolean;
  player_sid:          string;
  current_index:       number;
  playlist_id:         string;
  created_at:          Date;
  modified_at:         Date;
  last_played:         string;
}