import { UserResponse, useUser } from "../authentication/hooks/useUser";

import { Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  children: React.ReactNode
}

const ProtectedRoute = ({children} : Props) => {
  const navigate = useNavigate();
  const {isLoading, isAuthenticated, fetchStatus}: UserResponse = useUser();

  useEffect( ()=> {
    if (!isAuthenticated && !isLoading && fetchStatus !== "fetching")
    {
      navigate('/landing');
    }
  }, [isAuthenticated, isLoading, fetchStatus, navigate])

  if (isLoading) return (
    <Typography>Loading</Typography>
  );

  if (isAuthenticated) return children;
}

export default ProtectedRoute
