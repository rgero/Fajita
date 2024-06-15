import { Interaction } from "../interfaces/Interaction";

export const OpenYouTubeURL = (interaction: Interaction) => {
  const url = `https://www.youtube.com/watch?v=${interaction.video.video_id}`;
  const iosUrl = `youtube://${interaction.video.video_id}`;
  const androidUrl = `intent://www.youtube.com/watch?v=${interaction.video.video_id}#Intent;package=com.google.android.youtube;scheme=https;end`;

  // Fallback to normal YouTube link if the app is not installed
  const fallbackUrl = url;

  // Open link based on the platform
  if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
    window.location.href = iosUrl;
  } else if (/android/i.test(navigator.userAgent)) {
    window.location.href = androidUrl;
  } else {
    window.location.href = fallbackUrl;
  }


}