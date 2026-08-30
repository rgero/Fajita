import { Avatar, Box, ButtonBase, Typography } from '@mui/material';

import { EmojiPeople } from '@mui/icons-material';
import toast from 'react-hot-toast';
import { useQueueContext } from '@context/queue/QueueContext';

const ActiveQueueListItem = ({id, owner, image, isLocked, closeFn} : {id: string, owner: string, image: string|undefined, isLocked: boolean, closeFn: () => void}) => {
  const {connectToQueue} = useQueueContext();

  const processConnect = async () => {
    try {
      await connectToQueue(id);
      toast.success("Connected to Queue");
      closeFn();
    } catch (error) {
      console.error("Connection error:", error);
      toast.error("Failed to connect to Queue");
    }
  };
  
  return (
    <ButtonBase
      onClick={processConnect}
      sx={{
        width: '100%',
        borderRadius: 2,
        px: 1.5,
        py: 1.25,
        border: '1px solid',
        borderColor: 'divider',
        backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
        transition: 'all 0.2s ease',
        '&:hover': {
          backgroundColor: 'action.hover',
          transform: 'translateY(-1px)',
          boxShadow: 1,
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', gap: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, minWidth: 0, flex: 1 }}>
          {image ? <Avatar src={image} sx={{ width: 42, height: 42 }} /> : (<Avatar sx={{ width: 42, height: 42 }}><EmojiPeople /></Avatar>)}
          <Box sx={{ minWidth: 0 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
              {owner}
            </Typography>
            <Typography variant="caption" color="text.secondary">{isLocked ? "Locked" : "Open"}</Typography>
          </Box>
        </Box>

        <Typography
          variant="button"
          sx={{
            color: 'primary.main',
            fontWeight: 700,
            letterSpacing: 0.5,
            px: 1,
            flexShrink: 0,
          }}
        >
          Join
        </Typography>
      </Box>
    </ButtonBase>
  )
}

export default ActiveQueueListItem
