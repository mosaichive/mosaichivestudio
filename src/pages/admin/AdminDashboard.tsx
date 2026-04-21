import React from 'react';
import { Link } from 'react-router-dom';
import { useProjects, useTestimonials, useClientLogos } from '@/hooks/useStudioContent';
import { FolderKanban, Quote, Building2, Settings } from 'lucide-react';

const StatCard = ({ label, value, to, icon: Icon }: { label: string; value: number | string; to: string; icon: React.ElementType }) => (
  <Link to={to} className="luxe-card p-6 bg-card hover:border-secondary/40 transition-all group block">
    <div className="flex items-center justify-between mb-4">
      <Icon className="text-secondary" size={20} />
      <span className="text-xs uppercase tracking-[0.2em] text-foreground/50 group-hover:text-secondary transition-colors">
        Manage →
      </span>
    </div>
    <div className="font-display text-4xl text-foreground mb-2">{value}</div>
    <p className="text-sm text-foreground/60">{label}</p>
  </Link>
);

const AdminDashboard = () => {
  const { data: projects } = useProjects();
  const { data: testimonials } = useTestimonials();
  const { data: logos } = useClientLogos();

  return (
    <div className="space-y-10">
      <header>
        <p className="eyebrow mb-3">Welcome back</p>
        <h1 className="font-display text-4xl md:text-5xl text-foreground">
          Studio at a glance.
        </h1>
        <p className="mt-3 text-foreground/60 max-w-xl">
          Edit any content here and your live site updates instantly — no refresh needed.
        </p>
      </header>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Projects" value={projects?.length ?? '—'} to="/admin/projects" icon={FolderKanban} />
        <StatCard label="Testimonials" value={testimonials?.length ?? '—'} to="/admin/testimonials" icon={Quote} />
        <StatCard label="Client Logos" value={logos?.length ?? '—'} to="/admin/logos" icon={Building2} />
        <StatCard label="Site Settings" value="Edit" to="/admin/settings" icon={Settings} />
      </div>

      <section className="luxe-card p-8 bg-card">
        <h2 className="font-display text-2xl mb-2">Quick guide</h2>
        <ul className="space-y-3 text-sm text-foreground/70 mt-4">
          <li>• <strong className="text-foreground">Projects</strong> — create case studies with cover, gallery, results, and drag to reorder.</li>
          <li>• <strong className="text-foreground">Featured</strong> projects appear in the homepage "Selected Work" grid.</li>
          <li>• <strong className="text-foreground">Site Settings</strong> control hero, about, counters, contact and CTA copy site-wide.</li>
          <li>• <strong className="text-foreground">Invites</strong> let you grant admin access to other team members by email.</li>
        </ul>
      </section>
    </div>
  );
};

export default AdminDashboard;
