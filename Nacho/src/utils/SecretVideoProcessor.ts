import GetSecretCover from "./GetSecretCover";
import { Interaction } from "@interfaces/Interaction";
import { QueueStatus } from "@interfaces/QueueStatus";
import { Visibility } from "@interfaces/Visibility";
import { getSecretMessage } from "./SecretMessageGenerator";

export const ProcessVideo = (interaction: Interaction, currentIndex: number) => {
  const shouldBeVisible: boolean = interaction.visibility != Visibility.Hidden && interaction.visibility != Visibility.Random || interaction.index <= currentIndex;
  const response: QueueStatus = {isVisible: shouldBeVisible, message: null, cover: null}
  if (!shouldBeVisible)
  {
    response["message"] = getSecretMessage();
    response["cover"] = GetSecretCover(response);
  }

  return response;
}