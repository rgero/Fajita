import supabase from './supabase';

export const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo:  import.meta.env.VITE_REDIRECT_URL
      }
  })

  if (error)
  {
    throw new Error(error.message);
  }
  return data;
}

export const getCurrentUser = async () => {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);
  return data?.user;
}
