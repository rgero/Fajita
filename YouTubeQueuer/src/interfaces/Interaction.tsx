interface User {
  first_name: string
}

export interface Video {
  id: number,
  title: string,
  video_id: string,
  thumbnail: string,
  duration: number
}

export interface Interaction {
  created_at: string,
  id: number,
  index: number,
  play_next: boolean,
  user : User,
  video: Video,
  visibility: number
}