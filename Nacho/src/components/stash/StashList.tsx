import { Box, Container } from "@mui/material";

import { Artifact } from "../../interfaces/Artifact";
import Empty from "../ui/Empty";
import Spinner from "../ui/Spinner";
import StashCard from "./StashCard";
import toast from "react-hot-toast";
import { useStashProvider } from "../../context/StashContext";

const StashList = () => {
  const { isLoading, stashData, error } = useStashProvider();

  if (isLoading) return (<Spinner />)

  if (error) {
    toast.error("Error fetching stash");
  }

  if (stashData.length == 0) {
    return <Empty resource="videos" />
  }

  return (
    <Container disableGutters sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      {
        stashData.artifacts.map((entry: Artifact, index: number) => (
          <Box sx={{ paddingBottom: { xs: 2 }, width: '100%', maxWidth: 600 }} key={index}>
            <StashCard data={entry} />
          </Box>
        ))
      }
    </Container>
  )
}

export default StashList;
