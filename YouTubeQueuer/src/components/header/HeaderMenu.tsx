import {Divider, Menu} from "@mui/material";

import ActiveQueueDialog from "../active_queues/ActiveQueueDialog";
import FeedbackOption from "./HeaderOptions/FeedbackOption";
import LockQueueModal from "./modals/LockQueueModal";
import LockQueueOption from "./HeaderOptions/LockQueueOption";
import LogoutOption from "./HeaderOptions/LogoutOption";
import QueueManagement from "./HeaderOptions/QueueManagement";
import React from "react";
import ToggleDarkModeOption from "./HeaderOptions/ToggleDarkModeOption";

interface Props
{
  anchorEl: HTMLElement | null,
  closeFn: () => void
}

const HeaderMenu: React.FC<Props> = ({anchorEl, closeFn}) => {
  const [activeQueuesOpen, setActiveQueuesOpen] = React.useState(false);
  const [lockQueueOpen, setLockQueueOpen] = React.useState(false);
  const isOpen = Boolean(anchorEl);

  return (
    <>
      <ActiveQueueDialog open={activeQueuesOpen} setOpen={setActiveQueuesOpen}/>
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
        <LockQueueOption setShowLockModal={setLockQueueOpen}/>
        <Divider/>
        <ToggleDarkModeOption/>
        <Divider/>
        <FeedbackOption/>
        <LogoutOption/>
      </Menu>
    </>
  );
}

export default HeaderMenu
