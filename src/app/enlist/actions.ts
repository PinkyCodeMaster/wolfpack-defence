import { createClient } from "@/utils/supabase/client";

export async function login(email: string, password: string) {
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    throw new Error(error.message);
  }
}

export async function signup(email: string, password: string) {
  const supabase = createClient();

  const { error } = await supabase.auth.signUp({ email, password });

  if (error) {
    throw new Error(error.message);
  }
}
