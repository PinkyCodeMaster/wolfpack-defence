import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";

// Function to download image and return URL
export async function downloadAvatarImage(path: string) {
  const supabase = createClient();
  try {
    const { data, error } = await supabase.storage
      .from("avatars")
      .download(path);
    if (error) {
      throw error;
    }

    const url = URL.createObjectURL(data);
    return url;
  } catch (error) {
    console.error("Error downloading image: ", error);
    toast.error("Failed to load operator avatar", {
      description: "Please try again later.",
    });
    return null;
  }
}

// Function to upload avatar file and return file path
export async function uploadAvatar(uid: string | null, file: File) {
  const supabase = createClient();
  try {
    const fileExt = file.name.split(".").pop();
    const filePath = `${uid}-${Math.random()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    return filePath;
  } catch (error) {
    toast.error("Error uploading avatar", {
      description:
        error instanceof Error
          ? error.message
          : "An unexpected error occurred.",
    });
    throw error;
  }
}
