import { Container, CssBaseline } from "@mui/material"

import Footer from "../Footer/FooterContainer"
import Header from "../Header/Header"
import { Outlet } from "react-router-dom"

const AppLayout = () => {
  return (
    <>
      <CssBaseline/>
      <Header/>
      <Container disableGutters className="mt-24 mb-32">
        <Outlet/>
      </Container>
      <Footer/>
    </>
  )
}

export default AppLayout
