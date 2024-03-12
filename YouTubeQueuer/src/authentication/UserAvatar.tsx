import { useUser } from "./hooks/useUser";

const UserAvatar = () => {
  const {user} = useUser();
  
  let avatar;
  if (!user)
  {
    avatar = "default-user.jpg"
  } else {
    avatar = user.user_metadata["avatar"]
  }

  return (
    <div>
      <img className="w-10 h-10 rounded-full" src={avatar} alt="Avatar"/>
    </div>
  )
}

export default UserAvatar