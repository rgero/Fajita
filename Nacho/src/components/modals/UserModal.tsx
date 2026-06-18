import { Box, Button, Grid, Stack, Typography } from '@mui/material';

import Modal from './Modal';
import { useAuth } from '@context/authentication/AuthenticationContext';
import { useModalContext } from '@context/modal/ModalContext';

const UserModal: React.FC = () => {
  const { userModalOpen, toggleUserModalOpen } = useModalContext();
  const {user} = useAuth();
  return (
    <Modal open={userModalOpen} closeFn={toggleUserModalOpen}>
      <>
        <Typography variant="h6" gutterBottom>Profile for {user?.first_name}</Typography>
        <Stack spacing={3} sx={{alignItems: 'center'}}>
          <Box 
            component="img" 
            src={user?.picture}
            sx={{
              height: 300,
              width: 300,
              objectFit: 'cover',
              borderRadius: 2,
              boxShadow: 3,
              display: 'block',
              mx: 'auto'
            }}
          />
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Typography sx={{ fontWeight: "bold" }}>Display Name:</Typography>
            <Typography>{user?.first_name}</Typography>
          </Box>
          <Box sx={{ alignSelf: 'flex-end' }}>
            <Button variant="contained" onClick={toggleUserModalOpen}>
              Close
            </Button>
          </Box>
        </Stack>
      </>
    </Modal>
  );
};

export default UserModal;
