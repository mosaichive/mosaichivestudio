import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Save } from "lucide-react";

const settingsFields = [
  { key: "logo_url", label: "Logo URL" },
  { key: "favicon_url", label: "Favicon URL" },
  { key: "footer_text", label: "Footer Text", multiline: true },
  { key: "copyright_text", label: "Copyright Text" },
  { key: "quick_links", label: "Quick Links (JSON)", multiline: true },
  { key: "social_links", label: "Social Links (JSON)", multiline: true },
  { key: "business_name", label: "Business Name" },
  { key: "business_email", label: "Business Email" },
  { key: "business_phone", label: "Business Phone" },
  { key: "business_address", label: "Business Address", multiline: true },
];

const AdminSettingsPage = () => {
  const [settings, setSettings] = useState<Record<string, { id?: string; value: string }>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from("global_settings").select("*");
      const map: Record<string, { id?: string; value: string }> = {};
      settingsFields.forEach((f) => { map[f.key] = { value: "" }; });
      data?.forEach((d) => {
        const val = typeof d.setting_value === "object" && d.setting_value !== null ? (d.setting_value as any).value ?? "" : String(d.setting_value ?? "");
        map[d.setting_key] = { id: d.id, value: val };
      });
      setSettings(map);
      setLoading(false);
    };
    fetch();
  }, []);

  const save = async (key: string) => {
    const entry = settings[key];
    if (entry.id) {
      const { error } = await supabase.from("global_settings").update({ setting_value: { value: entry.value } }).eq("id", entry.id);
      if (error) toast.error("Failed"); else toast.success("Saved!");
    } else {
      const { error, data } = await supabase.from("global_settings").insert({ setting_key: key, setting_value: { value: entry.value } }).select().single();
      if (error) toast.error("Failed"); else { toast.success("Created!"); setSettings((p) => ({ ...p, [key]: { ...p[key], id: data.id } })); }
    }
  };

  if (loading) return <div className="text-muted-foreground">Loading...</div>;

  return (
    <div className="space-y-6">
      <div><h1 className="font-display text-2xl font-bold">Global Settings</h1><p className="text-sm text-muted-foreground font-body">Manage footer, logo, and business info</p></div>
      <div className="grid gap-4">
        {settingsFields.map((field) => (
          <Card key={field.key} className="border-border/60"><CardHeader className="pb-3"><CardTitle className="font-display text-base">{field.label}</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {field.multiline ? <Textarea value={settings[field.key]?.value ?? ""} onChange={(e) => setSettings((p) => ({ ...p, [field.key]: { ...p[field.key], value: e.target.value } }))} rows={3} /> :
                <Input value={settings[field.key]?.value ?? ""} onChange={(e) => setSettings((p) => ({ ...p, [field.key]: { ...p[field.key], value: e.target.value } }))} />}
              <Button onClick={() => save(field.key)} size="sm" className="bg-gradient-gold"><Save className="h-4 w-4 mr-1" /> Save</Button>
            </CardContent></Card>
        ))}
      </div>
    </div>
  );
};

export default AdminSettingsPage;
