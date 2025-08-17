import ActiveQueueList from "./ActiveQueueList"
import Dialog from "../ui/Dialog"
import { useDialogContext } from "../../context/DialogContext";

const ActiveQueueDialog = () => {
  const {activeQueuesOpen, toggleActiveQueuesOpen} = useDialogContext();
  return (
    <Dialog open={activeQueuesOpen} setOpen={toggleActiveQueuesOpen} title={"Active Queues"}>
      <ActiveQueueList closeFn={toggleActiveQueuesOpen}/>
    </Dialog>
  )
}

export default ActiveQueueDialog
