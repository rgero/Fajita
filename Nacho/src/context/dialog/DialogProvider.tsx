import ActiveQueueDialog from '@components/active_queues/ActiveQueueDialog';
import { DialogContext } from './DialogContext';
import FeedbackDialog from '@components/feedback/FeedbackDialog';
import QueueDialog from '@components/queue/QueueDialog';
import React from 'react';
import StashDialog from '@components/stash/StashDialog';
import UserSettingsDialog from '@components/settings/UserSettingsDialog';
import { useQueueContext } from '@context/queue/QueueContext';

export const DialogProvider = ({ children }: { children: React.ReactNode }) => {
  const { needsQueueSelection } = useQueueContext();
  const [queueOpen, setQueueOpen] = React.useState(false);
  const [activeQueuesOpen, setActiveQueuesOpen] = React.useState(false);
  const [feedbackOpen, setFeedbackOpen] = React.useState(false);
  const [stashOpen, setStashOpen] = React.useState(false);
  const [settingsOpen, setSettingsOpen] = React.useState(false);

  // Auto-prompt the user to pick a queue when several are open and none is connected.
  React.useEffect(() => {
    if (needsQueueSelection) setActiveQueuesOpen(true);
  }, [needsQueueSelection]);

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

