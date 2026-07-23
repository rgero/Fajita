import { Share, YouTube } from "@mui/icons-material";

import Button from "@components/ui/Button";
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
          <Button onClick={()=> {
            copyVideoIDToClipboard(targetID);
          }} icon={(<Share/>)} title="Copy" disabled={disabled}/>
        </Grid>
      ) : null }
      {shareOptions.youtube ? (
        <Grid>
          <Button onClick={() => OpenYouTubeURL(targetID)} icon={(<YouTube color="error"/>)} title="YouTube" disabled={disabled}/>
        </Grid>
      ) : null }
    </>
  );
};

export default ShareButtons;