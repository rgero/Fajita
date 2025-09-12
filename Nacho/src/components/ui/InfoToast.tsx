import { ToastBar, toast } from 'react-hot-toast';

import React from 'react';
import { Typography } from '@mui/material';

type InfoToastProps = {
  message: string;
};

const InfoToastObject: React.FC<InfoToastProps> = ({ message }) => {
  return (
    <>
      <img
        src="/fajita.svg"
        alt="Rudy"
        style={{
          width: 32,
          height: 32,
        }}
      />
      <Typography variant="body2" style={{paddingLeft: "10px", fontWeight: "bold"}}>{message}</Typography>
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