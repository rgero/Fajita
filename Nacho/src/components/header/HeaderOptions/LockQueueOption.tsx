import { Lock, LockOpen } from "@mui/icons-material";

import HeaderMenuOption from "./HeaderMenuOption";
import { useDialogContext } from "../../../context/dialog/DialogContext";
import { useQueueProvider } from "../../../context/QueueContext";

const LockQueueOption = () => {
  const {queueData} = useQueueProvider();
  const isQueueLocked = queueData?.locked;

  const {toggleLockQueueOpen} = useDialogContext();

  return (
    <HeaderMenuOption 
      icon={isQueueLocked ? <LockOpen/> : <Lock/>} 
      text={isQueueLocked ? "Unlock Queue" : "Lock Queue"}
      onClick={toggleLockQueueOpen}
    />
  )
}

export default LockQueueOption
