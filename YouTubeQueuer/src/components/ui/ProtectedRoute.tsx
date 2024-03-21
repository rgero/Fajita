import { Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../authentication/hooks/useUser";

type Props = {
  children: React.ReactNode
}

const ProtectedRoute = ({children} : Props) => {
  const navigate = useNavigate();
  const {isLoading, isAuthenticated, fetchStatus} = useUser();

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
