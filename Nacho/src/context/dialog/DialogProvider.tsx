import ActiveQueueDialog from '@components/active_queues/ActiveQueueDialog';
import { DialogContext } from './DialogContext';
import FeedbackDialog from '@components/feedback/FeedbackDialog';
import QueueDialog from '@components/queue/QueueDialog';
import React from 'react';
import StashDialog from '@components/stash/StashDialog';
import UserSettingsDialog from '@components/settings/UserSettingsDialog';

export const DialogProvider = ({ children }: { children: React.ReactNode }) => {
  const [queueOpen, setQueueOpen] = React.useState(false);
  const [activeQueuesOpen, setActiveQueuesOpen] = React.useState(false);
  const [feedbackOpen, setFeedbackOpen] = React.useState(false);
  const [stashOpen, setStashOpen] = React.useState(false);
  const [settingsOpen, setSettingsOpen] = React.useState(false);

  const toggleQueueOpen = () => setQueueOpen(prev => !prev);
  const toggleActiveQueuesOpen = () => setActiveQueuesOpen(prev => !prev);
  const toggleFeedbackOpen = () => setFeedbackOpen(prev => !prev);
  const toggleStashOpen = () => setStashOpen(prev => !prev);
  const toggleSettingsOpen = () => setSettingsOpen(prev => !prev);

  return (
    <DialogContext.Provider value={{ 
      queueOpen, 
      activeQueuesOpen,
      feedbackOpen, 
      stashOpen, 
      settingsOpen,
      areAnyOpen: queueOpen || activeQueuesOpen || stashOpen || settingsOpen || feedbackOpen, 
      toggleQueueOpen, 
      toggleActiveQueuesOpen, 
      toggleFeedbackOpen,
      toggleStashOpen, 
      toggleSettingsOpen 
    }}>
      <QueueDialog/>
      <UserSettingsDialog/>
      <ActiveQueueDialog/>
      <StashDialog/>
      <FeedbackDialog/>
      {children}
    </DialogContext.Provider>
  );
};

