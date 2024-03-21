import { Container, CssBaseline } from "@mui/material"

import Footer from "../Footer/FooterContainer"
import { Outlet } from "react-router-dom"

const AppLayout = () => {
  return (
    <>
      <CssBaseline/>
      <Container disableGutters className="mt-24 mb-32" sx={{width: {xs: "100%", md:"40%"}}}>
        <Outlet/>
      </Container>
      <Footer/>
    </>
  )
}

export default AppLayout
