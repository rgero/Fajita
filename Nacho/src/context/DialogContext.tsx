import React, { createContext, useContext } from 'react';

interface DialogContextType {
  queueOpen: boolean;
  activeQueuesOpen: boolean;
  feedbackOpen: boolean;
  stashOpen: boolean;
  settingsOpen: boolean;
  areAnyOpen: boolean;
  setQueueOpen: (open: boolean) => void;
  setActiveQueuesOpen: (open: boolean) => void;
  setFeedbackOpen: (open: boolean) => void;
  setStashOpen: (open: boolean) => void;
  setSettingsOpen: (open: boolean) => void;
}

const DialogContext = createContext<DialogContextType | undefined>(undefined);

export const DialogProvider = ({ children }: { children: React.ReactNode }) => {
  const [queueOpen, setQueueOpen] = React.useState(false);
  const [activeQueuesOpen, setActiveQueuesOpen] = React.useState(false);
  const [feedbackOpen, setFeedbackOpen] = React.useState(false);
  const [stashOpen, setStashOpen] = React.useState(false);
  const [settingsOpen, setSettingsOpen] = React.useState(false);

  return (
    <DialogContext.Provider value={{ 
      queueOpen, 
      activeQueuesOpen,
      feedbackOpen, 
      stashOpen, 
      settingsOpen,
      areAnyOpen: queueOpen || activeQueuesOpen || stashOpen || settingsOpen || feedbackOpen, 
      setQueueOpen, 
      setActiveQueuesOpen, 
      setFeedbackOpen,
      setStashOpen, 
      setSettingsOpen  
    }}>
      {children}
    </DialogContext.Provider>
  );
};

export const useDialogContext = (): DialogContextType => {
  const context = useContext(DialogContext);
  if (context === undefined) {
    throw new Error('useDialogContext must be used within an DialogProvider');
  }
  return context;
};