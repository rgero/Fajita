import { Lock, LockOpen } from "@mui/icons-material";

import HeaderMenuOption from "./HeaderMenuOption";
import { useModalContext } from "@context/modal/ModalContext";
import { useQueueContext } from '@context/queue/QueueContext';

const LockQueueOption = () => {
  const {queueData} = useQueueContext();
  const isQueueLocked = queueData?.locked;

  const {toggleLockQueueModalOpen} = useModalContext();

  return (
    <HeaderMenuOption 
      icon={isQueueLocked ? <LockOpen color="error"/> : <Lock/>} 
      text={isQueueLocked ? "Unlock Queue" : "Lock Queue"}
      color={isQueueLocked ? "error": ""}
      onClick={toggleLockQueueModalOpen}
    />
  )
}

export default LockQueueOption
