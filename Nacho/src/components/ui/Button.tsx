import {Box, ButtonBase, Typography} from "@mui/material"

import React from "react"

interface ButtonProps {
  icon: React.ReactNode,
  onClick: () => void,
  title: string|null
}

const Button: React.FC<ButtonProps> = ({icon, onClick, title}) => {
  return (
    <ButtonBase 
      sx={{
        borderRadius: "40px",
        paddingInline: "5px"
      }}
      onClick={onClick}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"

      >
        {icon}
        <Typography variant="caption">{title}</Typography>
      </Box>
    </ButtonBase>
  )
}

export default Button
