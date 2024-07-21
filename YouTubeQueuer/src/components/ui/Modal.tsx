import { Box, Modal as MaterialModel } from '@mui/material';

import { ReactElement } from 'react';
import { offsetHexColor } from "../../utils/HexColorOffset";
import { useTheme } from "@mui/material";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: {xs: '80%', md: "45%"},
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 2,
};

const Modal = ({open, closeFn, children} : {open: boolean, closeFn: ()=>void, children: ReactElement}) => {
  const theme = useTheme();
  const colorOffset = 30;
  style.bgcolor = theme.palette.mode == "light" ? 'background.paper' : offsetHexColor(theme.palette.background.paper, colorOffset);

  return (
    <MaterialModel
      open={open}
      onClose={closeFn}
    >
      <Box sx={style}>
        {children}
      </Box>
    </MaterialModel>
  )
}

export default Modal
