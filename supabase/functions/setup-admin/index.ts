import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    // Check if admin user already exists
    const { data: existingUsers } = await supabaseAdmin.auth.admin.listUsers();
    const adminExists = existingUsers?.users?.some(u => u.email === 'admin@mosaichive.studio');

    if (adminExists) {
      // Find the user and ensure they have the admin role
      const adminUser = existingUsers?.users?.find(u => u.email === 'admin@mosaichive.studio');
      if (adminUser) {
        const { data: roleExists } = await supabaseAdmin
          .from('user_roles')
          .select('id')
          .eq('user_id', adminUser.id)
          .eq('role', 'admin')
          .maybeSingle();

        if (!roleExists) {
          await supabaseAdmin.from('user_roles').insert({
            user_id: adminUser.id,
            role: 'admin',
          });
        }
      }
      return new Response(JSON.stringify({ message: 'Admin already exists', userId: adminUser?.id }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Create admin user
    const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
      email: 'admin@mosaichive.studio',
      password: 'Momax0107',
      email_confirm: true,
    });

    if (createError) {
      return new Response(JSON.stringify({ error: createError.message }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Assign admin role
    await supabaseAdmin.from('user_roles').insert({
      user_id: newUser.user.id,
      role: 'admin',
    });

    return new Response(JSON.stringify({ message: 'Admin created', userId: newUser.user.id }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
