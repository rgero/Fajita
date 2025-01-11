import { Lock, LockOpen } from "@mui/icons-material";

import HeaderMenuOption from "./HeaderMenuOption";
import { useQueueProvider } from "../../../context/QueueContext";

const LockQueueOption = ({setShowLockModal} : {setShowLockModal: (showModal: boolean) => void}) => {
  const {queueData} = useQueueProvider();
  const isQueueLocked = queueData?.locked;

  const toggleQueueLock = () => {
    setShowLockModal(true);
  }

  return (
    <HeaderMenuOption 
      icon={isQueueLocked ? <LockOpen/> : <Lock/>} 
      text={isQueueLocked ? "Unlock Queue" : "Lock Queue"}
      onClick={toggleQueueLock}
    />
  )
}

export default LockQueueOption
