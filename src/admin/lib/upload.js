import { supabase } from "../../lib/supabase";

// Uploads an image file to the Supabase `project-media` bucket and returns its
// public URL.
export async function uploadImage(file) {
  const path = `${Date.now()}-${file.name.replace(/[^a-z0-9.]+/gi, "-")}`;
  const { error } = await supabase.storage.from("project-media").upload(path, file, { upsert: false });
  if (error) throw error;
  return supabase.storage.from("project-media").getPublicUrl(path).data.publicUrl;
}
