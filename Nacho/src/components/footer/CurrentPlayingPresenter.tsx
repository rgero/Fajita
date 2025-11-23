import BlankCard from "./BlankCard";
import FooterCard from "./FooterCard";
import { Interaction } from '@interfaces/Interaction';
import Spinner from "../ui/Spinner";
import { useQueueContext } from '@context/queue/QueueContext';

const CurrentPlayingPresenter = () => {
  const {isLoading, queueData} = useQueueContext();

  if (isLoading)
  {
    return (<Spinner/>)
  }

  // If we have nothing in the queue
  if (!queueData.interactions || queueData.interactions.length === 0 || !queueData.current_interaction)
  {
    return (<BlankCard/>)
  }

  const title: string =  queueData.current_interaction.video.title;
  const imageURL: string = queueData.current_interaction.video.thumbnail;
  const targetUser: string = queueData.current_interaction.user.first_name;

  const currentIndex = queueData.interactions.findIndex((option: Interaction) => option.index === queueData.current_index) + 1;
  const total = queueData.interactions.length;

  return (<FooterCard title={title} imageURL={imageURL} currentIndex={currentIndex} total={total} user={targetUser}/>)

}

export default CurrentPlayingPresenter
