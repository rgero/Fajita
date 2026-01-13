import { Box, Button, Grid, Typography } from '@mui/material';

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
        <Grid container direction="column" spacing={3}>
            
            <Grid>
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
            </Grid>

            <Grid>
              <Grid container justifyContent="space-around">
                <Typography fontWeight="bold">Display Name</Typography>
                <Typography>{user?.first_name}</Typography>
              </Grid>
            </Grid>
            
            <Grid sx={{ alignSelf: 'flex-end' }}>
              <Button variant="contained" onClick={toggleUserModalOpen}>
                Close
              </Button>
            </Grid>

          </Grid>
      </>
    </Modal>
  );
};

export default UserModal;
