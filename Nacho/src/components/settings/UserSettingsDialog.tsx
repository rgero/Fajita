import Dialog from '../ui/Dialog';
import UserSettingsContent from './UserSettingsContent';

const UserSettingsDialog = ({open, setOpen} : {open: boolean, setOpen: (open: boolean) => void}) => {
  return (
    <Dialog open={open} setOpen={setOpen} title={"Settings"}>
      <UserSettingsContent/>
    </Dialog>
  );
}

export default UserSettingsDialog;