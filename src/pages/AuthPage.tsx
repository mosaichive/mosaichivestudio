import React, { useEffect, useState } from 'react';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Loader2 } from 'lucide-react';
import logo from '@/assets/logo.png';

const AuthPage = () => {
  const { user, isAdmin, loading, signIn, signUp, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    document.title = 'Studio Admin · Mosaic06';
  }, []);

  if (!loading && user && isAdmin) return <Navigate to="/admin" replace />;
  if (!loading && user && !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-6">
        <div className="max-w-md text-center space-y-6">
          <h1 className="font-display text-3xl">Access pending</h1>
          <p className="text-foreground/70">
            Your account is signed in but doesn't have admin access yet. Ask an existing
            admin to invite your email, then sign out and sign back in.
          </p>
          <Button onClick={() => signOut().then(() => navigate('/auth'))}>
            Sign out
          </Button>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setSubmitting(true);
    const fn = mode === 'signin' ? signIn : signUp;
    const { error } = await fn(email.trim(), password);
    setSubmitting(false);
    if (error) {
      toast({ title: 'Authentication error', description: error.message, variant: 'destructive' });
      return;
    }
    if (mode === 'signup') {
      toast({
        title: 'Check your email',
        description: 'Confirm your email, then sign in. (If you were invited, admin access is granted automatically.)',
      });
      setMode('signin');
    } else {
      navigate('/admin');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background grain-overlay">
      <header className="container-editorial pt-8">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-foreground/60 hover:text-foreground transition-colors">
          <ArrowLeft size={14} /> Back to site
        </Link>
      </header>
      <main className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <img src={logo} alt="Mosaic06" className="h-12 w-auto mx-auto mb-6" />
            <h1 className="font-display text-3xl md:text-4xl text-foreground mb-2">
              Studio Admin
            </h1>
            <p className="text-foreground/60 text-sm">
              {mode === 'signin' ? 'Sign in to manage your studio content.' : 'Create your invited account.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 luxe-card p-8 bg-card">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                placeholder="you@studio.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
                placeholder="••••••••"
              />
            </div>
            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting && <Loader2 className="animate-spin" size={16} />}
              {mode === 'signin' ? 'Sign in' : 'Create account'}
            </Button>

            <p className="text-center text-sm text-foreground/60">
              {mode === 'signin' ? "Don't have an account? " : 'Already have one? '}
              <button
                type="button"
                className="text-secondary hover:underline font-medium"
                onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
              >
                {mode === 'signin' ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </form>

          <p className="mt-6 text-xs text-center text-foreground/50 leading-relaxed">
            Admin access is invite-only. New accounts only get admin rights if their email
            has been invited from inside the dashboard.
          </p>
        </div>
      </main>
    </div>
  );
};

export default AuthPage;
