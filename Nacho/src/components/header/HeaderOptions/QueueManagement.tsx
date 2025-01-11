import { Cameraswitch, QueueMusic } from "@mui/icons-material";

import HeaderMenuOption from "./HeaderMenuOption";
import { useQueueProvider } from "../../../context/QueueContext";

const QueueManagement = ({setOpen} : {setOpen : (open: boolean) => void}) => {
  const {getQueueOwner} = useQueueProvider();
  const queueOwner: string = getQueueOwner();

  return (
    <>
      {queueOwner && (
        <HeaderMenuOption icon={<QueueMusic/>} text={`${queueOwner}'s Queue`}/>
      )}
      <HeaderMenuOption icon={<Cameraswitch/>} text="Connect to Queue" onClick={() => setOpen(true)}/>
    </>
  )
}

export default QueueManagement
