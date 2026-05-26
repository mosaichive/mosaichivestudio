import { supabase } from '@/integrations/supabase/client';

export const getSupabaseFunctionHeaders = async (): Promise<Record<string, string>> => {
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session?.access_token) {
      return {
        Authorization: `Bearer ${session.access_token}`,
      };
    }
  } catch {
    // Public forms may not have an auth session. Fall back to anonymous access.
  }

  return {};
};
