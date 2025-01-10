import Dialog from "../ui/Dialog";
import StashList from "./StashList";

const StashDialog = ({open, setOpen} : {open: boolean, setOpen: (open: boolean) => void}) => {
  return (
    <Dialog open={open} setOpen={setOpen} title={"Your Stash"}>
      <StashList/>
    </Dialog>
  );
}

export default StashDialog
