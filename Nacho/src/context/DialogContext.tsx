import React, { createContext, useContext } from 'react';

import ActiveQueueDialog from '../components/active_queues/ActiveQueueDialog';
import FeedbackDialog from '../components/feedback/FeedbackDialog';
import LockQueueModal from '../components/modals/LockQueueModal';
import QueueDialog from '../components/queue/QueueDialog';
import StashDialog from '../components/stash/StashDialog';
import UserSettingsDialog from '../components/settings/UserSettingsDialog';

interface DialogContextType {
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

const DialogContext = createContext<DialogContextType | undefined>(undefined);

export const DialogProvider = ({ children }: { children: React.ReactNode }) => {
  const [queueOpen, setQueueOpen] = React.useState(false);
  const [activeQueuesOpen, setActiveQueuesOpen] = React.useState(false);
  const [feedbackOpen, setFeedbackOpen] = React.useState(false);
  const [stashOpen, setStashOpen] = React.useState(false);
  const [settingsOpen, setSettingsOpen] = React.useState(false);
  const [lockQueueOpen, setLockQueueOpen] = React.useState(false);

  const toggleQueueOpen = () => setQueueOpen(prev => !prev);
  const toggleActiveQueuesOpen = () => setActiveQueuesOpen(prev => !prev);
  const toggleFeedbackOpen = () => setFeedbackOpen(prev => !prev);
  const toggleStashOpen = () => setStashOpen(prev => !prev);
  const toggleSettingsOpen = () => setSettingsOpen(prev => !prev);
  const toggleLockQueueOpen = () => setLockQueueOpen(prev => !prev);

  return (
    <DialogContext.Provider value={{ 
      queueOpen, 
      activeQueuesOpen,
      feedbackOpen, 
      stashOpen, 
      settingsOpen,
      lockQueueOpen,
      areAnyOpen: queueOpen || activeQueuesOpen || stashOpen || settingsOpen || feedbackOpen || lockQueueOpen, 
      toggleQueueOpen, 
      toggleActiveQueuesOpen, 
      toggleFeedbackOpen,
      toggleStashOpen, 
      toggleSettingsOpen,
      toggleLockQueueOpen  
    }}>
      <QueueDialog/>
      <UserSettingsDialog/>
      <ActiveQueueDialog/>
      <StashDialog/>
      <FeedbackDialog/>
      <LockQueueModal open={lockQueueOpen} closeFn={() => setLockQueueOpen(false)}/>
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