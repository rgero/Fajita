import { Box, Modal as MaterialModel, ModalProps } from '@mui/material';

import React from 'react';

interface CustomModalProps extends ModalProps {
  open: boolean;
  closeFn: () => void;
  children: React.ReactElement
}

const Modal: React.FC<CustomModalProps> = ({open, closeFn, children, sx}) => {
  return (
    <MaterialModel
      open={open}
      onClose={closeFn}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '80%', md: "30%" },
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: 2,
          ...sx,
        }}
      >
        {children}
      </Box>
    </MaterialModel>
  )
}

export default Modal
