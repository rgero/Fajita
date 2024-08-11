import DialogComponent from '../ui/Dialog';
import QueueContent from './QueueContent';

const QueueDialog = ({open, setQueueOpen} : {open: boolean, setQueueOpen: (open: boolean) => void}) => {
  return (
    <DialogComponent title='Queue' open={open} setDialogOpen={setQueueOpen}  >
      <QueueContent/>
    </DialogComponent>
  );
}

export default QueueDialog;