import { Container, CssBaseline } from "@mui/material"

import Footer from "../Footer/FooterContainer"
import { Outlet } from "react-router-dom"

const AppLayout = () => {
  return (
    <>
      <CssBaseline/>
      <Container disableGutters sx={{width: {xs: "100%", md:"40%"}, marginTop: "5.5rem", marginBottom: "8rem"}}>
        <Outlet/>
      </Container>
      <Footer/>
    </>
  )
}

export default AppLayout
