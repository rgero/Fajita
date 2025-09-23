import { createContext, useContext } from "react";

export interface DialogContextType {
  queueOpen: boolean;
  activeQueuesOpen: boolean;
  feedbackOpen: boolean;
  stashOpen: boolean;
  settingsOpen: boolean;
  lockQueueOpen: boolean;
  areAnyOpen: boolean;
  toggleQueueOpen: () => void;
  toggleActiveQueuesOpen: () => void;
  toggleFeedbackOpen: () => void;
  toggleStashOpen: () => void;
  toggleSettingsOpen: () => void;
  toggleLockQueueOpen: () => void;
}

export const DialogContext = createContext<DialogContextType | null>(null);

export const useDialogContext = (): DialogContextType => {
  const context = useContext(DialogContext);
  if (context === null) {
    throw new Error('useDialogContext must be used within an DialogProvider');
  }
  return context;
};