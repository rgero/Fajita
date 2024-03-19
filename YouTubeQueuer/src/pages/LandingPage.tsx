import { Link } from "@mui/material"

const LandingPage = () => {
  return (
    <div>
      <Link href={`${import.meta.env.VITE_BACKEND_URL}/login`}>Login to Thing</Link>
    </div>
  )
}

export default LandingPage
