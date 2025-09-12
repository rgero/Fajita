import { Grid } from "@mui/material"
import { ReactNode } from "react";

const InfoSection = ({children}: {children: ReactNode}) => {
  const style = {
    minHeight: "125px",
    paddingX: 2,
    justifyContent: "center",
    width:"100%",
  }
  
  return (
    <Grid container direction="column" alignContent="center" spacing={2} sx={style}>
      {children}
    </Grid>
  )
}

export default InfoSection
