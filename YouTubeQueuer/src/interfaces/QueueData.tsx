import { Interaction } from "./Interaction";

export interface QueueData {
  interactions:  Interaction[];
  id:            number;
  active:        boolean;
  player_sid:    string;
  current_index: number;
  playlist_id:   string;
  created_at:    string;
  modified_at:   string;
}