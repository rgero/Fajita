import { Box, Container, CssBaseline } from "@mui/material";

import Footer from "../Footer/FooterContainer";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";

const AppLayout = () => {
  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    setVh();
    window.addEventListener("resize", setVh);

    return () => {
      window.removeEventListener("resize", setVh);
    };
  }, []);

  return (
    <>
      <CssBaseline />
      <Box display="flex" flexDirection="column" height="calc(var(--vh, 1vh) * 100)">
        <Box flexGrow={1} overflow="auto" display="flex" justifyContent="center" sx={{ mt: "6rem" }}>
          <Container disableGutters sx={{ width: { xs: "95%", md: "40%" } }}>
            <Outlet />
          </Container>
        </Box>
        <Box>
          <Footer />
        </Box>
      </Box>
    </>
  );
};

export default AppLayout;