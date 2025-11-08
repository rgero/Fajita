import AddRandomModal from "@components/modals/add_modals/AddRandomModal";
import AddToQueueModal from "@components/modals/add_modals/AddToQueueModal";
import ClearStashModal from "@components/modals/ClearStashModal";
import LockQueueModal from "@components/modals/LockQueueModal";
import { ModalContext } from "./ModalContext";
import QueueInfoModal from "@components/modals/QueueInfoModal";
import { useState } from "react";

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [clearStashModalOpen, setClearStashModalOpen] = useState(false);
  const [lockQueueModalOpen, setLockQueueModalOpen] = useState(false);
  const [queueInfoModalOpen, setQueueInfoModalOpen] = useState(false);
  const [addRandomModalOpen, setAddRandomModalOpen] = useState(false);
  const [addToQueueModalOpen, setAddToQueueModalOpen] = useState(false);

  const toggleClearStashModalOpen = () => setClearStashModalOpen(prev => !prev);
  const toggleLockQueueModalOpen = () => setLockQueueModalOpen(prev => !prev);
  const toggleQueueInfoModalOpen = () => setQueueInfoModalOpen(prev => !prev);
  const toggleAddRandomModalOpen = () => setAddRandomModalOpen(prev => !prev);
  const toggleAddToQueueModalOpen = () => setAddToQueueModalOpen(prev => !prev);

  return (
    <ModalContext.Provider value={{ 
      anyModalsOpen: clearStashModalOpen || lockQueueModalOpen || queueInfoModalOpen || addRandomModalOpen || addToQueueModalOpen,
      clearStashModalOpen,
      lockQueueModalOpen,
      queueInfoModalOpen,
      addRandomModalOpen,
      addToQueueModalOpen,
      toggleClearStashModalOpen,
      toggleLockQueueModalOpen,
      toggleQueueInfoModalOpen,
      toggleAddRandomModalOpen,
      toggleAddToQueueModalOpen,

    }}>
      <AddRandomModal/>
      <AddToQueueModal/>
      <ClearStashModal/>
      <LockQueueModal/>
      <QueueInfoModal/>
      {children}
    </ModalContext.Provider>
  );
};

