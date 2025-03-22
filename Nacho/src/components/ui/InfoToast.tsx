import { ToastBar, toast } from 'react-hot-toast';

import InfoIcon from '@mui/icons-material/Info'; // Import Material UI Icon
import React from 'react';

type InfoToastProps = {
  message: string;
};

const InfoToastObject: React.FC<InfoToastProps> = ({ message }) => {
  return (
    <>
      <InfoIcon fontSize="medium" style={{ color: '#CDC1FF' }} />
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
