import { useLocation } from "react-router-dom";
import { NavLink } from "@/components/NavLink";
import {
  LayoutDashboard, Home, Info, Briefcase, DollarSign, FolderOpen,
  TrendingUp, ShoppingBag, Users, Mail, Image, Settings, Search,
  MessageSquare, FileText,
} from "lucide-react";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const mainItems = [
  { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
  { title: "Home Page", url: "/admin/home", icon: Home },
  { title: "About Page", url: "/admin/about", icon: Info },
  { title: "Services", url: "/admin/services", icon: Briefcase },
  { title: "Pricing", url: "/admin/pricing", icon: DollarSign },
  { title: "Portfolio", url: "/admin/portfolio", icon: FolderOpen },
  { title: "Growth Plans", url: "/admin/growth-plans", icon: TrendingUp },
  { title: "Shop", url: "/admin/shop", icon: ShoppingBag },
  { title: "Team", url: "/admin/team", icon: Users },
  { title: "Contact Page", url: "/admin/contact", icon: FileText },
];

const systemItems = [
  { title: "Messages", url: "/admin/messages", icon: MessageSquare },
  { title: "Media Library", url: "/admin/media", icon: Image },
  { title: "SEO Manager", url: "/admin/seo", icon: Search },
  { title: "Global Settings", url: "/admin/settings", icon: Settings },
];

const AdminSidebar = () => {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();

  const isActive = (path: string) =>
    path === "/admin" ? location.pathname === "/admin" : location.pathname.startsWith(path);

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarContent className="bg-sidebar">
        <div className="px-4 py-5 border-b border-sidebar-border">
          {!collapsed && (
            <div className="font-display text-lg font-bold text-sidebar-primary-foreground">
              <span className="text-sidebar-primary">Mosaic</span> Hive
            </div>
          )}
          {collapsed && (
            <div className="font-display text-lg font-bold text-sidebar-primary text-center">M</div>
          )}
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/60 text-xs uppercase tracking-wider">
            Content
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/admin"}
                      className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-body transition-colors ${
                        isActive(item.url)
                          ? "bg-sidebar-accent text-sidebar-primary font-medium"
                          : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                      }`}
                      activeClassName=""
                    >
                      <item.icon className="h-4 w-4 shrink-0" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/60 text-xs uppercase tracking-wider">
            System
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {systemItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-body transition-colors ${
                        isActive(item.url)
                          ? "bg-sidebar-accent text-sidebar-primary font-medium"
                          : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                      }`}
                      activeClassName=""
                    >
                      <item.icon className="h-4 w-4 shrink-0" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AdminSidebar;
