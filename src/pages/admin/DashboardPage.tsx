import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import {
  Briefcase, DollarSign, FolderOpen, TrendingUp,
  ShoppingBag, Users, MessageSquare, Activity,
} from "lucide-react";

interface Stats {
  services: number;
  pricing: number;
  portfolio: number;
  growthPlans: number;
  products: number;
  team: number;
  messages: number;
}

const DashboardPage = () => {
  const [stats, setStats] = useState<Stats>({
    services: 0, pricing: 0, portfolio: 0, growthPlans: 0,
    products: 0, team: 0, messages: 0,
  });
  const [recentMessages, setRecentMessages] = useState<any[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
      const [s, p, po, g, sp, t, m] = await Promise.all([
        supabase.from("services").select("id", { count: "exact", head: true }),
        supabase.from("pricing_packages").select("id", { count: "exact", head: true }),
        supabase.from("portfolio_projects").select("id", { count: "exact", head: true }),
        supabase.from("growth_plans").select("id", { count: "exact", head: true }),
        supabase.from("shop_products").select("id", { count: "exact", head: true }),
        supabase.from("team_members").select("id", { count: "exact", head: true }),
        supabase.from("contact_messages").select("id", { count: "exact", head: true }),
      ]);
      setStats({
        services: s.count ?? 0, pricing: p.count ?? 0, portfolio: po.count ?? 0,
        growthPlans: g.count ?? 0, products: sp.count ?? 0, team: t.count ?? 0,
        messages: m.count ?? 0,
      });
    };

    const fetchRecent = async () => {
      const { data } = await supabase
        .from("contact_messages")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5);
      setRecentMessages(data ?? []);
    };

    fetchStats();
    fetchRecent();
  }, []);

  const cards = [
    { label: "Services", value: stats.services, icon: Briefcase, color: "text-blue-600" },
    { label: "Pricing Packages", value: stats.pricing, icon: DollarSign, color: "text-emerald-600" },
    { label: "Portfolio Projects", value: stats.portfolio, icon: FolderOpen, color: "text-violet-600" },
    { label: "Growth Plans", value: stats.growthPlans, icon: TrendingUp, color: "text-amber-600" },
    { label: "Shop Products", value: stats.products, icon: ShoppingBag, color: "text-rose-600" },
    { label: "Team Members", value: stats.team, icon: Users, color: "text-cyan-600" },
    { label: "Messages", value: stats.messages, icon: MessageSquare, color: "text-orange-600" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Dashboard Overview</h1>
        <p className="text-muted-foreground font-body text-sm mt-1">Welcome to the Mosaic Hive administration panel.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {cards.map((card) => (
          <Card key={card.label} className="elegant-shadow hover:shadow-md transition-shadow border-border/60">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground font-body">{card.label}</p>
                  <p className="text-2xl font-bold font-display mt-1">{card.value}</p>
                </div>
                <card.icon className={`h-8 w-8 ${card.color} opacity-80`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="elegant-shadow border-border/60">
        <CardHeader>
          <CardTitle className="font-display text-lg flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            Recent Messages
          </CardTitle>
        </CardHeader>
        <CardContent>
          {recentMessages.length === 0 ? (
            <p className="text-muted-foreground text-sm font-body">No messages yet.</p>
          ) : (
            <div className="space-y-3">
              {recentMessages.map((msg) => (
                <div key={msg.id} className="flex items-start justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className="min-w-0">
                    <p className="text-sm font-medium font-body truncate">{msg.name}</p>
                    <p className="text-xs text-muted-foreground font-body truncate">{msg.email}</p>
                    <p className="text-sm text-muted-foreground font-body mt-1 line-clamp-1">{msg.message}</p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full shrink-0 ml-2 ${
                    msg.is_read ? "bg-muted text-muted-foreground" : "bg-primary/10 text-primary font-medium"
                  }`}>
                    {msg.is_read ? "Read" : "New"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardPage;
