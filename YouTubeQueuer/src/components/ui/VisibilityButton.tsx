import { useEffect, useState } from "react"

import { Button } from "@mui/material"

interface Props {
  id: string,
  activeButton: string | null,
  children: React.ReactNode,
  processChange: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const VisibilityButton : React.FC<Props> = ({id, activeButton, children, processChange}) => {
  const [isActive, setActive] = useState(false);

  useEffect( () => {
    setActive( id == activeButton)
  }, [id, activeButton])

  return (
    <Button
      id={id}
      variant="text"
      color={isActive ? "success" : undefined}
      onClick={processChange}
    >
      {children}
    </Button>
  )
}

export default VisibilityButton
