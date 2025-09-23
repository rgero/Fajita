import {Divider, Menu} from "@mui/material";

import FeedbackOption from "./HeaderOptions/FeedbackOption";
import LockQueueOption from "./HeaderOptions/LockQueueOption";
import LogoutOption from "./HeaderOptions/LogoutOption";
import QueueManagement from "./HeaderOptions/QueueManagement";
import React from "react";
import StashDisplayOption from "./HeaderOptions/StashDisplayOption";
import UserSettingsOption from "./HeaderOptions/UserSettingsOption";
import { useQueueProvider } from "../../context/queue/QueueContext";

interface Props
{
  anchorEl: HTMLElement | null,
  closeFn: () => void
}

const HeaderMenu: React.FC<Props> = ({anchorEl, closeFn}) => {

  const {queueData} = useQueueProvider();
  const isOpen = Boolean(anchorEl);

  return (
    <>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={isOpen}
        onClose={closeFn}
        onClick={closeFn}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <QueueManagement/>
        <Divider/>
        <StashDisplayOption/>
        {queueData.id ? [
          <Divider key="lock-divider" />,
          <LockQueueOption key="lock-option"/>
        ] : null}
        <Divider/>
        <FeedbackOption/>
        <Divider/>
        <UserSettingsOption/>
        <LogoutOption/>
      </Menu>
    </>
  );
}

export default HeaderMenu
