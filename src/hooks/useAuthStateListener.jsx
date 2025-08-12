import { useEffect } from "react";
import { supabase } from "../supabaseClient";

const useAuthStateListener = (setUser) => {
  useEffect(() => {
    const { data: subscription } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUser(session.user);
        } else {
          setUser(null);
        }
      }
    );

    console.log(subscription);

    return () => {
      subscription?.unsubscribe(); // ✅ This is the correct syntax
    };
  }, [setUser]);
};

export default useAuthStateListener;
