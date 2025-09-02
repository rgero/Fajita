import { Box, ButtonBase, Typography, useTheme } from "@mui/material"

import { Palette } from "@mui/material/styles/createPalette"
import React from "react"

interface ButtonProps {
  icon: React.ReactNode
  onClick: () => void
  title: string | null
  color?: keyof Palette | string
}

const Button: React.FC<ButtonProps> = ({ icon, onClick, title, color }) => {
  const theme = useTheme()

  let resolvedColor: string = "inherit"

  const paletteEntry = color ? (theme.palette as Palette)[color as keyof Palette] : undefined;
  if (color && paletteEntry && typeof paletteEntry === "object" && "main" in paletteEntry) {
    resolvedColor = (paletteEntry as { main: string }).main;
  } else if (color) {
    resolvedColor = color;
  }

  return (
    <ButtonBase
      sx={{
        borderRadius: "40px",
        paddingInline: "5px",
        color: resolvedColor,
      }}
      onClick={onClick}
    >
      <Box display="flex" flexDirection="column" alignItems="center">
        {icon}
        <Typography variant="caption" sx={{ color: resolvedColor }}>
          {title}
        </Typography>
      </Box>
    </ButtonBase>
  )
}

export default Button
