import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Save } from "lucide-react";

const contactFields = [
  { key: "page_intro", label: "Page Intro", multiline: true },
  { key: "office_address", label: "Office Address", multiline: true },
  { key: "phone_number", label: "Phone Number" },
  { key: "email_address", label: "Email Address" },
  { key: "business_hours", label: "Business Hours", multiline: true },
  { key: "social_links", label: "Social Media Links (JSON)", multiline: true },
  { key: "map_content", label: "Map Section Content", multiline: true },
];

const AdminContactPage = () => {
  const [content, setContent] = useState<Record<string, { id?: string; value: string }>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from("page_content").select("*").eq("page_name", "contact");
      const map: Record<string, { id?: string; value: string }> = {};
      contactFields.forEach((f) => { map[f.key] = { value: "" }; });
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
    if (entry.id) {
      const { error } = await supabase.from("page_content").update({ content: { value: entry.value } }).eq("id", entry.id);
      if (error) toast.error("Failed"); else toast.success("Saved!");
    } else {
      const { error, data } = await supabase.from("page_content").insert({ page_name: "contact", section_key: key, content: { value: entry.value }, is_published: true }).select().single();
      if (error) toast.error("Failed"); else { toast.success("Created!"); setContent((p) => ({ ...p, [key]: { ...p[key], id: data.id } })); }
    }
  };

  if (loading) return <div className="text-muted-foreground">Loading...</div>;

  return (
    <div className="space-y-6">
      <div><h1 className="font-display text-2xl font-bold">Contact Page Manager</h1><p className="text-sm text-muted-foreground font-body">Manage contact page content</p></div>
      <div className="grid gap-4">
        {contactFields.map((field) => (
          <Card key={field.key} className="border-border/60"><CardHeader className="pb-3"><CardTitle className="font-display text-base">{field.label}</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {field.multiline ? <Textarea value={content[field.key]?.value ?? ""} onChange={(e) => setContent((p) => ({ ...p, [field.key]: { ...p[field.key], value: e.target.value } }))} rows={3} /> :
                <Input value={content[field.key]?.value ?? ""} onChange={(e) => setContent((p) => ({ ...p, [field.key]: { ...p[field.key], value: e.target.value } }))} />}
              <Button onClick={() => save(field.key)} size="sm" className="bg-gradient-gold"><Save className="h-4 w-4 mr-1" /> Save</Button>
            </CardContent></Card>
        ))}
      </div>
    </div>
  );
};

export default AdminContactPage;
