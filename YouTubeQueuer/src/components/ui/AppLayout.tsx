import { Box, Container, CssBaseline } from "@mui/material";

import Footer from "../Footer/FooterContainer";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <>
      <CssBaseline />
      <Box display="flex" flexDirection="column" height="100vh">
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
