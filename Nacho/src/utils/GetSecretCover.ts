import { QueueStatus } from "../interfaces/QueueStatus";

export default (status: QueueStatus) => {
  if (status.isVisible) return "";
  if (status.message?.includes("Daisy"))
  {
    return '/Daisy.png'
  } else {
    return '/BlackBox.png'
  }
}