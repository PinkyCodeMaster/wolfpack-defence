import { createClient } from "@/utils/supabase/client";
import { useState, useEffect } from "react";
import { type User as SupabaseUser } from "@supabase/supabase-js";

const supabase = createClient();

export function useAuth() {
  // Change the initial state of user to be `SupabaseUser | null`
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        const currentUser = session?.user ?? null;
        setUser(currentUser); // This now accepts `null`
        setLoading(false);
      }
    );

    checkUser();

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  async function checkUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    setUser(user); // This now also accepts `null`
    setLoading(false);
  }

  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setUser(null); // This is valid now
  };

  const register = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
  };

  return { user, loading, login, logout, register };
}
