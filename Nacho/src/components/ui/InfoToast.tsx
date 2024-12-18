import { ToastBar, toast } from 'react-hot-toast';

import InfoIcon from '@mui/icons-material/Info'; // Import Material UI Icon
import React from 'react';

type InfoToastProps = {
  message: string;
};

const InfoToastObject: React.FC<InfoToastProps> = ({ message }) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '8px 12px',
        borderRadius: '8px',
        color: '#CDC1FF',
      }}
    >
      <InfoIcon fontSize="medium" style={{ color: '#CDC1FF' }} />
      <span style={{ fontSize: '22px' }}>{message}</span>
    </div>
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
