import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { Loader2, Trash2, Mail, CheckCircle2 } from 'lucide-react';

interface Invite {
  id: string;
  email: string;
  role: 'admin' | 'editor';
  invited_by: string | null;
  accepted_at: string | null;
  created_at: string;
}

const AdminInvites = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [invites, setInvites] = useState<Invite[]>([]);
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('admin_invites')
      .select('*')
      .order('created_at', { ascending: false });
    setInvites((data ?? []) as Invite[]);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const invite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);
    const { error } = await supabase.from('admin_invites').insert({
      email: email.trim().toLowerCase(),
      role: 'admin',
      invited_by: user?.id ?? null,
    });
    setSubmitting(false);
    if (error) {
      toast({ title: 'Failed to invite', description: error.message, variant: 'destructive' });
      return;
    }
    toast({ title: 'Invite created', description: `Send the sign-up link to ${email}.` });
    setEmail('');
    load();
  };

  const revoke = async (id: string) => {
    await supabase.from('admin_invites').delete().eq('id', id);
    toast({ title: 'Invite revoked' });
    load();
  };

  return (
    <div className="space-y-8 max-w-3xl">
      <header>
        <p className="eyebrow mb-2">Access control</p>
        <h1 className="font-display text-3xl md:text-4xl">Admin invites</h1>
        <p className="mt-2 text-sm text-foreground/60">
          Invite a team member by email. When they sign up at <code className="px-1.5 py-0.5 rounded bg-muted">/auth</code> with that exact email,
          they're automatically promoted to admin.
        </p>
      </header>

      <form onSubmit={invite} className="luxe-card p-6 bg-card space-y-4">
        <div className="space-y-2">
          <Label>Email to invite</Label>
          <div className="flex gap-2">
            <Input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="teammate@studio.com"
              className="flex-1"
            />
            <Button type="submit" disabled={submitting}>
              {submitting ? <Loader2 className="animate-spin" size={16} /> : <Mail size={16} />}
              Invite
            </Button>
          </div>
        </div>
      </form>

      <div className="space-y-3">
        <h2 className="font-display text-xl">Pending & accepted invites</h2>
        {loading ? (
          <div className="py-12 text-center"><Loader2 className="animate-spin inline text-secondary" /></div>
        ) : invites.length === 0 ? (
          <p className="text-sm text-foreground/50">No invites yet.</p>
        ) : (
          <div className="space-y-2">
            {invites.map((i) => (
              <div key={i.id} className="flex items-center gap-3 p-4 rounded-lg border border-border bg-card">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground">{i.email}</p>
                  <p className="text-xs text-foreground/60 mt-0.5">
                    {i.accepted_at ? (
                      <span className="text-secondary inline-flex items-center gap-1">
                        <CheckCircle2 size={12} /> Accepted {new Date(i.accepted_at).toLocaleDateString()}
                      </span>
                    ) : (
                      <span>Pending — invited {new Date(i.created_at).toLocaleDateString()}</span>
                    )}
                  </p>
                </div>
                {!i.accepted_at && (
                  <Button variant="outline" size="sm" onClick={() => revoke(i.id)}>
                    <Trash2 size={14} /> Revoke
                  </Button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminInvites;
