import { supabase } from "../lib/supabase";

export const useAuth = () => {
  const login = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.error("Login Error:", error.message);
    } else {
      console.log("Logged in successfully");
    }
  };

  const signup = async (email, password) => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      console.error("Signup Error:", error.message);
    } else {
      console.log("Check your email for confirmation");
    }
  };

  const googleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) {
      console.error("Google login error:", error.message);
    }
  };

  return { login, signup, googleLogin };
};
