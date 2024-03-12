import { ResponseList } from "../dummyData/data"

export const getCurrentPlaying = async () => {
  return ResponseList[Math.floor(Math.random() * ResponseList.length)];
}