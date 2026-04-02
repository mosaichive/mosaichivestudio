import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useAdminCrud } from "@/hooks/useAdminCrud";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type GrowthPlan = Tables<"growth_plans">;

const AdminGrowthPlansPage = () => {
  const { items, loading, create, update, remove } = useAdminCrud<GrowthPlan>("growth_plans");
  const [search, setSearch] = useState("");
  const [editItem, setEditItem] = useState<GrowthPlan | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({ title: "", details: "", benefits: "", price: "", is_featured: false, is_published: false });

  const filtered = items.filter((s) => s.title.toLowerCase().includes(search.toLowerCase()));
  const openCreate = () => { setEditItem(null); setForm({ title: "", details: "", benefits: "", price: "", is_featured: false, is_published: false }); setIsOpen(true); };
  const openEdit = (item: GrowthPlan) => {
    setEditItem(item);
    const bens = Array.isArray(item.benefits) ? (item.benefits as string[]).join("\n") : "";
    setForm({ title: item.title, details: item.details ?? "", benefits: bens, price: item.price?.toString() ?? "", is_featured: item.is_featured, is_published: item.is_published });
    setIsOpen(true);
  };
  const handleSubmit = async () => {
    const payload = { title: form.title, details: form.details, benefits: form.benefits.split("\n").filter(Boolean), price: form.price ? parseFloat(form.price) : null, is_featured: form.is_featured, is_published: form.is_published };
    const ok = editItem ? await update(editItem.id, payload) : await create(payload);
    if (ok) setIsOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="font-display text-2xl font-bold">Growth Plans Manager</h1><p className="text-sm text-muted-foreground font-body">Manage real growth strategies for clients</p></div>
        <Button onClick={openCreate} className="bg-gradient-gold"><Plus className="h-4 w-4 mr-1" /> Add Plan</Button>
      </div>
      <div className="relative max-w-sm"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" /></div>
      <Card className="border-border/60"><CardContent className="p-0"><Table><TableHeader><TableRow><TableHead>Title</TableHead><TableHead className="hidden md:table-cell">Price</TableHead><TableHead>Featured</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
        <TableBody>{loading ? <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground">Loading...</TableCell></TableRow> :
          filtered.length === 0 ? <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground">No plans.</TableCell></TableRow> :
          filtered.map((item) => (
            <TableRow key={item.id}><TableCell className="font-medium">{item.title}</TableCell><TableCell className="hidden md:table-cell">{item.price ? `$${item.price}` : "—"}</TableCell><TableCell>{item.is_featured ? "⭐" : "—"}</TableCell>
            <TableCell><span className={`text-xs px-2 py-0.5 rounded-full ${item.is_published ? "bg-emerald-100 text-emerald-700" : "bg-muted text-muted-foreground"}`}>{item.is_published ? "Published" : "Draft"}</span></TableCell>
            <TableCell className="text-right space-x-1"><Button variant="ghost" size="icon" onClick={() => openEdit(item)}><Pencil className="h-4 w-4" /></Button>
              <AlertDialog><AlertDialogTrigger asChild><Button variant="ghost" size="icon" className="text-destructive"><Trash2 className="h-4 w-4" /></Button></AlertDialogTrigger><AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Delete "{item.title}"?</AlertDialogTitle><AlertDialogDescription>This cannot be undone.</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction onClick={() => remove(item.id)} className="bg-destructive text-destructive-foreground">Delete</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog>
            </TableCell></TableRow>))}</TableBody></Table></CardContent></Card>

      <Dialog open={isOpen} onOpenChange={setIsOpen}><DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto"><DialogHeader><DialogTitle className="font-display">{editItem ? "Edit Plan" : "Add Plan"}</DialogTitle></DialogHeader>
        <div className="space-y-4">
          <div><label className="text-sm font-medium font-body">Title</label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
          <div><label className="text-sm font-medium font-body">Details</label><Textarea value={form.details} onChange={(e) => setForm({ ...form, details: e.target.value })} rows={4} /></div>
          <div><label className="text-sm font-medium font-body">Benefits (one per line)</label><Textarea value={form.benefits} onChange={(e) => setForm({ ...form, benefits: e.target.value })} rows={4} /></div>
          <div><label className="text-sm font-medium font-body">Price ($)</label><Input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} /></div>
          <div className="flex items-center gap-3"><Switch checked={form.is_featured} onCheckedChange={(v) => setForm({ ...form, is_featured: v })} /><label className="text-sm font-body">Featured</label></div>
          <div className="flex items-center gap-3"><Switch checked={form.is_published} onCheckedChange={(v) => setForm({ ...form, is_published: v })} /><label className="text-sm font-body">Published</label></div>
          <Button onClick={handleSubmit} className="w-full bg-gradient-gold">{editItem ? "Update" : "Create"}</Button>
        </div></DialogContent></Dialog>
    </div>
  );
};

export default AdminGrowthPlansPage;
