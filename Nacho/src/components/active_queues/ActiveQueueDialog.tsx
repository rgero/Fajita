import ActiveQueueList from "./ActiveQueueList";
import Dialog from "@components/ui/Dialog";
import { useDialogContext } from "@context/dialog/DialogContext";

const ActiveQueueDialog = () => {
  const {activeQueuesOpen, toggleActiveQueuesOpen} = useDialogContext();
  return (
    <Dialog open={activeQueuesOpen} setOpen={toggleActiveQueuesOpen} title={"Active Queues"}>
      <ActiveQueueList closeFn={toggleActiveQueuesOpen}/>
    </Dialog>
  )
}

export default ActiveQueueDialog
