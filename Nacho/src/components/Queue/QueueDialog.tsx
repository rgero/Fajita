import Dialog from '../ui/Dialog';
import QueueList from './QueueList';

const QueueDialog = ({open, setQueueOpen} : {open: boolean, setQueueOpen: (open: boolean) => void}) => {
  return (
    <Dialog open={open} setOpen={setQueueOpen} title={"Queue"}>
      <QueueList/>
    </Dialog>
  );
}

export default QueueDialog;