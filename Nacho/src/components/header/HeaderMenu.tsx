import {Divider, Menu} from "@mui/material";

import ActiveQueueDialog from "../active_queues/ActiveQueueDialog";
import FeedbackDialog from "../Feedback/FeedbackDialog";
import FeedbackOption from "./HeaderOptions/FeedbackOption";
import LockQueueModal from "./modals/LockQueueModal";
import LockQueueOption from "./HeaderOptions/LockQueueOption";
import LogoutOption from "./HeaderOptions/LogoutOption";
import QueueManagement from "./HeaderOptions/QueueManagement";
import React from "react";
import StashDialog from "../stash/StashDialog";
import StashDisplayOption from "./HeaderOptions/StashDisplayOption";
import UserSettingsDialog from "../settings/UserSettingsDialog";
import UserSettingsOption from "./HeaderOptions/UserSettingsOption";
import { useDialogContext } from "../../context/DialogContext";
import { useQueueProvider } from "../../context/QueueContext";

interface Props
{
  anchorEl: HTMLElement | null,
  closeFn: () => void
}

const HeaderMenu: React.FC<Props> = ({anchorEl, closeFn}) => {
  const {
    settingsOpen,
    activeQueuesOpen,
    feedbackOpen,
    stashOpen,
    setSettingsOpen,
    setActiveQueuesOpen,
    setFeedbackOpen,
    setStashOpen
  } = useDialogContext();
  const [lockQueueOpen, setLockQueueOpen] = React.useState(false);
  const {queueData} = useQueueProvider();
  const isOpen = Boolean(anchorEl);

  return (
    <>
      <UserSettingsDialog open={settingsOpen} setOpen={setSettingsOpen}/>
      <ActiveQueueDialog open={activeQueuesOpen} setOpen={setActiveQueuesOpen}/>
      <StashDialog open={stashOpen} setOpen={setStashOpen}/>
      <FeedbackDialog open={feedbackOpen} setOpen={setFeedbackOpen}/>
      <LockQueueModal open={lockQueueOpen} closeFn={() => setLockQueueOpen(false)}/>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={isOpen}
        onClose={closeFn}
        onClick={closeFn}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <QueueManagement setOpen={setActiveQueuesOpen}/>
        <Divider/>
        <StashDisplayOption setOpen={setStashOpen}/>
        {queueData.id ? [
          <Divider key="lock-divider" />,
          <LockQueueOption key="lock-option" setShowLockModal={setLockQueueOpen} />
        ] : null}
        <Divider/>
        <FeedbackOption setOpen={setFeedbackOpen}/>
        <Divider/>
        <UserSettingsOption setOpen={setSettingsOpen}/>
        <LogoutOption/>
      </Menu>
    </>
  );
}

export default HeaderMenu
