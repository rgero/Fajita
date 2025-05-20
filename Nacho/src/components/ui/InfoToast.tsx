import { ToastBar, toast } from 'react-hot-toast';

import InfoIcon from '@mui/icons-material/Info'; // Import Material UI Icon
import React from 'react';
import { useTheme } from '@mui/material';

type InfoToastProps = {
  message: string;
};

const InfoToastObject: React.FC<InfoToastProps> = ({ message }) => {
  const theme = useTheme();
  return (
    <>
      <InfoIcon fontSize="medium" sx={{color: theme.palette.primary.main}}/>
      <span style={{paddingLeft: "10px"}}>{message}</span>
    </>
  );
};

const InfoToast = (message: string) => {
  return toast.custom((t) => (
    <ToastBar toast={t}>
      {() => <InfoToastObject message={message} />}
    </ToastBar>
  ));
};


export default InfoToast;
