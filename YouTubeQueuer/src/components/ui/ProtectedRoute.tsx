import { Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../authentication/hooks/useUser";

type Props = {
  children: React.ReactNode
}

const ProtectedRoute = ({children} : Props) => {
  const navigate = useNavigate();
  const {isLoading, isAuthenicated, fetchStatus} = useUser();

  useEffect( ()=> {
    if (!isAuthenicated && !isLoading && fetchStatus !== "fetching")
    {
      navigate('/landing');
    }
  }, [isAuthenicated, isLoading, fetchStatus, navigate])

  if (isLoading) return (
    <Typography>Loading</Typography>
  );

  if (isAuthenicated) return children;
}

export default ProtectedRoute
