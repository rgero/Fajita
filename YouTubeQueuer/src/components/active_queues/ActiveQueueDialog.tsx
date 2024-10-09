import ActiveQueueList from "./ActiveQueueList"
import Dialog from "../ui/Dialog"

const ActiveQueueDialog = ({open, setOpen} : {open: boolean, setOpen: (open: boolean) => void}) => {

  const closeDialog = () => {
    setOpen(false);
  }

  return (
    <Dialog open={open} setOpen={setOpen} title={"Active Queues"}>
      <ActiveQueueList closeFn={closeDialog}/>
    </Dialog>
  )
}

export default ActiveQueueDialog
