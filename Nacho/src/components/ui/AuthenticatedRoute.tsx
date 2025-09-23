import Loading from "./Loading";
import { useAuth } from "../../context/authentication/AuthenticationContext";
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
    <Loading/>
  );

  if (isAuthenticated) return children;
}

export default AuthenticatedRoute
