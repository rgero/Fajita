import Dialog from '../ui/Dialog';
import UserSettingsContent from './UserSettingsContent';
import { useDialogContext } from '../../context/DialogContext';

const UserSettingsDialog = () => {
  const {settingsOpen, toggleSettingsOpen} = useDialogContext();
  return (
    <Dialog open={settingsOpen} setOpen={toggleSettingsOpen} title={"Settings"}>
      <UserSettingsContent/>
    </Dialog>
  );
}

export default UserSettingsDialog;