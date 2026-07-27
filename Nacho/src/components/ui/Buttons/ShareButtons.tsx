import { Share, YouTube } from "@mui/icons-material";

import Button from "@components/ui/Buttons/Button";
import { Grid } from "@mui/material";
import { OpenYouTubeURL } from "@utils/OpenYoutubeURL";
import { copyVideoIDToClipboard } from "@utils/CopyToClipboard";
import { useSettings } from "@context/settings/SettingsContext";

const ShareButtons: React.FC<{ targetID: string; disabled?: boolean }> = ({ targetID, disabled = false }) => {
  const { shareOptions } = useSettings();

  return (
    <>
      {shareOptions.clipboard ? (
        <Grid>
          <Button 
            onClick={() => {
              if (!disabled) copyVideoIDToClipboard(targetID);
            }} 
            icon={<Share color={disabled ? "disabled" : "inherit"} />} 
            title="Copy" 
            disabled={disabled}
          />
        </Grid>
      ) : null}

      {shareOptions.youtube ? (
        <Grid>
          <Button 
            onClick={() => {
              if (!disabled) OpenYouTubeURL(targetID);
            }} 
            icon={<YouTube color={disabled ? "disabled" : "error"} />} 
            title="YouTube" 
            disabled={disabled}
          />
        </Grid>
      ) : null}
    </>
  );
};

export default ShareButtons;