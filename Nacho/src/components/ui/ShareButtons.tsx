import { Share, YouTube } from "@mui/icons-material";

import Button from "@components/ui/Button";
import { Grid } from "@mui/material";
import { OpenYouTubeURL } from "@utils/OpenYoutubeURL";
import { copyVideoIDToClipboard } from "@utils/CopyToClipboard";
import { useSettings } from "@context/settings/SettingsContext";

const ShareButtons: React.FC<{ targetID: string }> = ({ targetID }) => {
  const { shareOptions } = useSettings();

  return (
    <>
      {shareOptions.clipboard ? (
        <Grid>
          <Button onClick={()=> {
            copyVideoIDToClipboard(targetID);
          }} icon={(<Share/>)} title="Copy"/>
        </Grid>
      ) : null }
      {shareOptions.youtube ? (
        <Grid>
          <Button onClick={() => OpenYouTubeURL(targetID)} icon={(<YouTube color="error"/>)} title="YouTube"/>
        </Grid>
      ) : null }
    </>
  );
};

export default ShareButtons;