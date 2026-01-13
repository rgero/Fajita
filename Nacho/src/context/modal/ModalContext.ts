import { createContext, useContext } from "react";

export interface ModalContextType {
  anyModalsOpen: boolean;
  clearStashModalOpen: boolean;
  lockQueueModalOpen: boolean;
  queueInfoModalOpen: boolean;
  addRandomModalOpen: boolean;
  addToQueueModalOpen: boolean;
  confirmSkipModalOpen: boolean;
  shareModalOpen: boolean;
  userModalOpen: boolean;

  toggleClearStashModalOpen: () => void;
  toggleLockQueueModalOpen: () => void;
  toggleQueueInfoModalOpen: () => void;
  toggleAddRandomModalOpen: () => void;
  toggleAddToQueueModalOpen: () => void;
  toggleConfirmSkipModalOpen: () => void;
  toggleShareModalOpen: () => void;
  toggleUserModalOpen: () => void;
}

export const ModalContext = createContext<ModalContextType | null>(null);

export const useModalContext = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (context === null) {
    throw new Error('useModalContext must be used within an ModalProvider');
  }
  return context;
};