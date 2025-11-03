import axios from "axios";

export const submitFeedback = async ({user, title, description} : {user: string|undefined, title: string, description: string}) => {
  const feedbackURL = import.meta.env.VITE_FEEDBACK_URL;
  const targetKey = import.meta.env.VITE_FEEDBACK_KEY;

  const config = {
    headers: {
      "Authorization": targetKey
    }
  }

  if (user)
  {
    description = description ? `${description}\n\nLogged By ${user}` : `Logged by ${user}`
  }

  const feedback = {
    "repo": "rgero/Fajita",
    title: title,
    description: description
  }
  await axios.post(feedbackURL, feedback, config);
}