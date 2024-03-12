import { Typography } from "@mui/material";
import { decode } from "html-entities";
import { useCurrentPlaying } from "../../hooks/useCurrentPlaying";

const FooterCard = () => {

  const {isLoading, currentlyPlaying} = useCurrentPlaying();
  if (isLoading) return (<Typography>Loading...</Typography>)

  const title: string = decode(currentlyPlaying?.snippet.title);
  const channelTitle: string = decode(currentlyPlaying?.snippet.channelTitle);
 
  return (
    <div className="flex flex-column gap-x-1 align-middle">
      <img className="image-contain max-h-24" src={currentlyPlaying?.snippet.thumbnails.max.url} alt={currentlyPlaying?.snippet.title}/>
      <div>
        <div className="font-bold">Currently Playing</div>
        <div className="overflow-hidden">{title}</div>
        <div>{channelTitle}</div>
      </div>
    </div>
  )
}

export default FooterCard
