import { Cameraswitch, QueueMusic } from "@mui/icons-material";

import HeaderMenuOption from "./HeaderMenuOption";
import { useDialogContext } from "../../../context/DialogContext";
import { useQueueProvider } from "../../../context/QueueContext";

const QueueManagement = () => {
  const {toggleActiveQueuesOpen} = useDialogContext();
  const {getQueueOwner} = useQueueProvider();
  const queueOwner: string = getQueueOwner();

  return (
    <>
      {queueOwner && (
        <HeaderMenuOption icon={<QueueMusic/>} text={`${queueOwner}'s Queue`}/>
      )}
      <HeaderMenuOption icon={<Cameraswitch/>} text="Connect to Queue" onClick={toggleActiveQueuesOpen}/>
    </>
  )
}

export default QueueManagement
