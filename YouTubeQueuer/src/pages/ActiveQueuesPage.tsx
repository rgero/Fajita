import { Container, CssBaseline } from "@mui/material"

import ActiveQueueList from "../components/active_queues/ActiveQueueList"
import PageHeader from "../components/ui/PageHeader"

const ActiveQueuesPage = () => {
  return (
    <>
      <CssBaseline/>
      <Container disableGutters sx={{width: {xs: "100%", md:"40%"}, marginTop: "5.5rem"}}>
        <PageHeader title={"Active Queues"}/>
        <ActiveQueueList/>
      </Container>
    </>

  )
}

export default ActiveQueuesPage
