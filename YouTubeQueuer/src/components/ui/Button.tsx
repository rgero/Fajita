import {Box, Typography} from "@mui/material"

import React from "react"

interface ButtonProps {
  icon: React.ReactNode,
  onClick: () => void,
  title: string|null
}

const Button: React.FC<ButtonProps> = ({icon, onClick, title}) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      onClick={onClick}
    >
      {icon}
      <Typography variant="caption">{title}</Typography>
    </Box>
  )
}

export default Button
