import { supabase } from '@/integrations/supabase/client';

export const uploadStudioAsset = async (file: File, folder: string): Promise<string> => {
  const ext = file.name.split('.').pop() ?? 'jpg';
  const safeName = file.name.replace(/[^a-z0-9._-]/gi, '_');
  const path = `${folder}/${Date.now()}-${safeName}`;
  const { error } = await supabase.storage.from('studio-assets').upload(path, file, {
    cacheControl: '3600',
    upsert: false,
    contentType: file.type,
  });
  if (error) throw error;
  const { data } = supabase.storage.from('studio-assets').getPublicUrl(path);
  return data.publicUrl;
};
