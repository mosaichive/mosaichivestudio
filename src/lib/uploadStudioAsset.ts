import { supabase } from '@/integrations/supabase/client';

const BUCKET = 'media';

export const uploadStudioAsset = async (file: File, folder: string): Promise<string> => {
  const safeName = file.name.replace(/[^a-z0-9._-]/gi, '_');
  const path = `${folder}/${Date.now()}-${safeName}`;
  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    cacheControl: '3600',
    upsert: false,
    contentType: file.type,
  });
  if (error) throw error;
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
};
