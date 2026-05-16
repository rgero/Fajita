import toast from "react-hot-toast";

const YOUTUBE_VIDEO_ID_PATTERN = /^[a-zA-Z0-9_-]{11}$/;

export const OpenYouTubeURL = (video_id: string) => {
  if (!YOUTUBE_VIDEO_ID_PATTERN.test(video_id)) {
    toast.error("Invalid YouTube video ID");
    return false;
  }

  const url = `https://www.youtube.com/watch?v=${video_id}`;
  const iosUrl = `youtube://${video_id}`;
  const androidUrl = `intent://www.youtube.com/watch?v=${video_id}#Intent;package=com.google.android.youtube;scheme=https;end`;

  if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
    window.location.href = iosUrl;
  } else if (/android/i.test(navigator.userAgent)) {
    window.location.href = androidUrl;
  } else {
    window.location.href = url;
  }

  return true;
};
