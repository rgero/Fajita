import { Box, Container } from "@mui/material";

import { Artifact } from "../../interfaces/Artifact";
import CompactStashCard from "./CompactStashCard";
import Empty from "../ui/Empty";
import Spinner from "../ui/Spinner";
import StashCard from "./StashCard";
import toast from "react-hot-toast";
import { useSettings } from "../../context/settings/SettingsContext";
import { useStashProvider } from "../../context/StashContext";

const StashList = () => {
  const {isLoading, GetFilteredData, error} = useStashProvider();
  const {isStashCompact} = useSettings();
  
  const stashData = GetFilteredData();
  if (isLoading) return (<Spinner />)

  if (error) {
    toast.error("Error fetching stash");
  }

  if (stashData.length == 0) {
    return <Empty resource="videos" />
  }

  return (
    <Container disableGutters sx={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "5px" }}>
      {
        stashData.map((entry: Artifact, index: number) => (
          <Box sx={{ paddingBottom: { xs: 1 }, width: '100%', maxWidth: 600 }} key={index}>
            {isStashCompact ? <CompactStashCard data={entry} /> : <StashCard data={entry} />}
          </Box>
        ))
      }
    </Container>
  )
}

export default StashList;
