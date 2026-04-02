import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Save } from "lucide-react";

interface ContentSection {
  id?: string;
  value: string;
}

const homeFields = [
  { key: "hero_heading", label: "Hero Heading" },
  { key: "hero_subheading", label: "Hero Subheading" },
  { key: "cta_button_text", label: "CTA Button Text" },
  { key: "banner_image", label: "Banner Image URL" },
];

const AdminHomePage = () => {
  const [content, setContent] = useState<Record<string, ContentSection>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from("page_content").select("*").eq("page_name", "home");
      const map: Record<string, ContentSection> = {};
      homeFields.forEach((f) => { map[f.key] = { value: "" }; });
      data?.forEach((d) => {
        const val = typeof d.content === "object" && d.content !== null ? (d.content as any).value ?? "" : "";
        map[d.section_key] = { id: d.id, value: val };
      });
      setContent(map);
      setLoading(false);
    };
    fetch();
  }, []);

  const save = async (key: string) => {
    const entry = content[key];
    const payload = { page_name: "home", section_key: key, content: { value: entry.value }, is_published: true };
    if (entry.id) {
      const { error } = await supabase.from("page_content").update({ content: { value: entry.value } }).eq("id", entry.id);
      if (error) toast.error("Failed"); else toast.success("Saved!");
    } else {
      const { error, data } = await supabase.from("page_content").insert(payload).select().single();
      if (error) toast.error("Failed"); else { toast.success("Created!"); setContent((prev) => ({ ...prev, [key]: { ...prev[key], id: data.id } })); }
    }
  };

  if (loading) return <div className="text-muted-foreground">Loading...</div>;

  return (
    <div className="space-y-6">
      <div><h1 className="font-display text-2xl font-bold">Home Page Manager</h1><p className="text-sm text-muted-foreground font-body">Manage homepage content</p></div>
      <div className="grid gap-4">
        {homeFields.map((field) => (
          <Card key={field.key} className="border-border/60">
            <CardHeader className="pb-3"><CardTitle className="font-display text-base">{field.label}</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {field.key.includes("heading") || field.key.includes("subheading") ? (
                <Textarea value={content[field.key]?.value ?? ""} onChange={(e) => setContent((p) => ({ ...p, [field.key]: { ...p[field.key], value: e.target.value } }))} rows={2} />
              ) : (
                <Input value={content[field.key]?.value ?? ""} onChange={(e) => setContent((p) => ({ ...p, [field.key]: { ...p[field.key], value: e.target.value } }))} />
              )}
              <Button onClick={() => save(field.key)} size="sm" className="bg-gradient-gold"><Save className="h-4 w-4 mr-1" /> Save</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminHomePage;
