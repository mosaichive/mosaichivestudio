import React from 'react';
import { Navigate, Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  FolderKanban,
  Quote,
  Building2,
  Settings,
  UserPlus,
  LogOut,
  Loader2,
  ExternalLink,
} from 'lucide-react';
import logo from '@/assets/logo.png';

const navItems = [
  { to: '/admin', icon: LayoutDashboard, label: 'Overview', end: true },
  { to: '/admin/projects', icon: FolderKanban, label: 'Projects' },
  { to: '/admin/testimonials', icon: Quote, label: 'Testimonials' },
  { to: '/admin/logos', icon: Building2, label: 'Client Logos' },
  { to: '/admin/settings', icon: Settings, label: 'Site Settings' },
  { to: '/admin/invites', icon: UserPlus, label: 'Admin Invites' },
];

const AdminLayout = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="animate-spin text-secondary" size={32} />
      </div>
    );
  }

  if (!user) return <Navigate to="/auth" replace />;
  if (!isAdmin) return <Navigate to="/auth" replace />;

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-card flex flex-col sticky top-0 h-screen">
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Mosaic06" className="h-8 w-auto" />
            <div>
              <p className="font-display text-base">Studio Admin</p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-foreground/50">Mosaic06</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground/70 hover:bg-foreground/5 hover:text-foreground'
                }`
              }
            >
              <item.icon size={16} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-border space-y-2">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between text-sm text-foreground/60 hover:text-foreground px-3 py-2 rounded-lg hover:bg-foreground/5"
          >
            View site <ExternalLink size={14} />
          </a>
          <div className="px-3 py-2 text-xs text-foreground/50 truncate">{user.email}</div>
          <Button variant="outline" size="sm" className="w-full" onClick={handleSignOut}>
            <LogOut size={14} /> Sign out
          </Button>
        </div>
      </aside>

      <main className="flex-1 overflow-x-hidden">
        <div className="p-8 md:p-12 max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
