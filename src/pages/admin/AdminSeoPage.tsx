import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Save } from "lucide-react";

const pages = ["home", "about", "services", "pricing", "portfolio", "growth-plans", "shop", "team", "contact"];

const AdminSeoPage = () => {
  const [seoData, setSeoData] = useState<Record<string, { id?: string; meta_title: string; meta_description: string; meta_keywords: string }>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from("seo_settings").select("*");
      const map: typeof seoData = {};
      pages.forEach((p) => { map[p] = { meta_title: "", meta_description: "", meta_keywords: "" }; });
      data?.forEach((d) => { map[d.page_name] = { id: d.id, meta_title: d.meta_title ?? "", meta_description: d.meta_description ?? "", meta_keywords: d.meta_keywords ?? "" }; });
      setSeoData(map);
      setLoading(false);
    };
    fetch();
  }, []);

  const save = async (page: string) => {
    const entry = seoData[page];
    if (entry.id) {
      const { error } = await supabase.from("seo_settings").update({ meta_title: entry.meta_title, meta_description: entry.meta_description, meta_keywords: entry.meta_keywords }).eq("id", entry.id);
      if (error) toast.error("Failed to save"); else toast.success(`SEO for ${page} updated`);
    } else {
      const { error, data } = await supabase.from("seo_settings").insert({ page_name: page, meta_title: entry.meta_title, meta_description: entry.meta_description, meta_keywords: entry.meta_keywords }).select().single();
      if (error) toast.error("Failed to save"); else { toast.success(`SEO for ${page} created`); setSeoData((prev) => ({ ...prev, [page]: { ...prev[page], id: data.id } })); }
    }
  };

  const updateField = (page: string, field: string, value: string) => {
    setSeoData((prev) => ({ ...prev, [page]: { ...prev[page], [field]: value } }));
  };

  if (loading) return <div className="text-muted-foreground">Loading...</div>;

  return (
    <div className="space-y-6">
      <div><h1 className="font-display text-2xl font-bold">SEO Manager</h1><p className="text-sm text-muted-foreground font-body">Manage SEO settings for each page</p></div>
      <div className="grid gap-4">
        {pages.map((page) => (
          <Card key={page} className="border-border/60">
            <CardHeader className="pb-3"><CardTitle className="font-display text-lg capitalize">{page} Page</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div><label className="text-sm font-medium font-body">Meta Title</label><Input value={seoData[page]?.meta_title ?? ""} onChange={(e) => updateField(page, "meta_title", e.target.value)} placeholder="Page title for search engines" /></div>
              <div><label className="text-sm font-medium font-body">Meta Description</label><Textarea value={seoData[page]?.meta_description ?? ""} onChange={(e) => updateField(page, "meta_description", e.target.value)} rows={2} placeholder="Page description for search engines" /></div>
              <div><label className="text-sm font-medium font-body">Keywords</label><Input value={seoData[page]?.meta_keywords ?? ""} onChange={(e) => updateField(page, "meta_keywords", e.target.value)} placeholder="Comma-separated keywords" /></div>
              <Button onClick={() => save(page)} size="sm" className="bg-gradient-gold"><Save className="h-4 w-4 mr-1" /> Save</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminSeoPage;
