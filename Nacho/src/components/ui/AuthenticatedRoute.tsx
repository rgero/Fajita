import { Typography } from "@mui/material";
import { useAuth } from "../../context/AuthenicationContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  children: React.ReactNode
}

const AuthenticatedRoute = ({children} : Props) => {
  const navigate = useNavigate();
  const {isLoading, isAuthenticated, fetchStatus} = useAuth();

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

export default AuthenticatedRoute
