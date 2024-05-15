import axios from "axios";

export const submitFeedback = async ({title, description} : {title: string, description: string}) => {
  const feedbackURL = import.meta.env.VITE_FEEDBACK_URL;
  const targetKey = import.meta.env.VITE_FEEDBACK_KEY;

  const config = {
    headers: {
      "Authorization": targetKey
    }
  }

  const feedback = {
    "repo": "rgero/Fajita",
    title: title,
    description: description
  }
  await axios.post(feedbackURL, feedback, config);
}