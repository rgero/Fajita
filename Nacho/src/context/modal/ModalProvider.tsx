import AddRandomModal from "@components/modals/add_modals/AddRandomModal";
import AddToQueueModal from "@components/modals/add_modals/AddToQueueModal";
import ClearStashModal from "@components/modals/ClearStashModal";
import ConfirmSkipModal from "@components/modals/ConfirmSkipModal";
import LockQueueModal from "@components/modals/LockQueueModal";
import { ModalContext } from "./ModalContext";
import QueueInfoModal from "@components/modals/queue_info/QueueInfoModal";
import ShareModal from "@components/modals/ShareModal";
import { useState } from "react";

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [clearStashModalOpen, setClearStashModalOpen] = useState(false);
  const [lockQueueModalOpen, setLockQueueModalOpen] = useState(false);
  const [queueInfoModalOpen, setQueueInfoModalOpen] = useState(false);
  const [addRandomModalOpen, setAddRandomModalOpen] = useState(false);
  const [addToQueueModalOpen, setAddToQueueModalOpen] = useState(false);
  const [confirmSkipModalOpen, setConfirmSkipModalOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  const toggleClearStashModalOpen = () => setClearStashModalOpen(prev => !prev);
  const toggleLockQueueModalOpen = () => setLockQueueModalOpen(prev => !prev);
  const toggleQueueInfoModalOpen = () => setQueueInfoModalOpen(prev => !prev);
  const toggleAddRandomModalOpen = () => setAddRandomModalOpen(prev => !prev);
  const toggleAddToQueueModalOpen = () => setAddToQueueModalOpen(prev => !prev);
  const toggleConfirmSkipModalOpen = () => setConfirmSkipModalOpen(prev => !prev);
  const toggleShareModalOpen = () => setShareModalOpen(prev => !prev);

  return (
    <ModalContext.Provider value={{ 
      anyModalsOpen: clearStashModalOpen || lockQueueModalOpen || queueInfoModalOpen || addRandomModalOpen || addToQueueModalOpen || confirmSkipModalOpen || shareModalOpen,
      clearStashModalOpen,
      lockQueueModalOpen,
      queueInfoModalOpen,
      addRandomModalOpen,
      addToQueueModalOpen,
      confirmSkipModalOpen,
      shareModalOpen,
      toggleClearStashModalOpen,
      toggleLockQueueModalOpen,
      toggleQueueInfoModalOpen,
      toggleAddRandomModalOpen,
      toggleAddToQueueModalOpen,
      toggleConfirmSkipModalOpen,
      toggleShareModalOpen

    }}>
      <AddRandomModal/>
      <AddToQueueModal/>
      <ClearStashModal/>
      <LockQueueModal/>
      <QueueInfoModal/>
      <ConfirmSkipModal/>
      <ShareModal/>
      {children}
    </ModalContext.Provider>
  );
};

