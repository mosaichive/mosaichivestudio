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

type Portfolio = Tables<"portfolio_projects">;

const AdminPortfolioPage = () => {
  const { items, loading, create, update, remove } = useAdminCrud<Portfolio>("portfolio_projects");
  const [search, setSearch] = useState("");
  const [editItem, setEditItem] = useState<Portfolio | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({ title: "", slug: "", category: "", client_name: "", description: "", cover_image_url: "", completion_date: "", is_published: false });

  const filtered = items.filter((s) => s.title.toLowerCase().includes(search.toLowerCase()));
  const openCreate = () => { setEditItem(null); setForm({ title: "", slug: "", category: "", client_name: "", description: "", cover_image_url: "", completion_date: "", is_published: false }); setIsOpen(true); };
  const openEdit = (item: Portfolio) => {
    setEditItem(item);
    setForm({ title: item.title, slug: item.slug ?? "", category: item.category ?? "", client_name: item.client_name ?? "", description: item.description ?? "", cover_image_url: item.cover_image_url ?? "", completion_date: item.completion_date ?? "", is_published: item.is_published });
    setIsOpen(true);
  };
  const handleSubmit = async () => {
    const payload = { ...form, completion_date: form.completion_date || null };
    const ok = editItem ? await update(editItem.id, payload) : await create(payload);
    if (ok) setIsOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="font-display text-2xl font-bold">Portfolio Manager</h1><p className="text-sm text-muted-foreground font-body">Manage portfolio projects</p></div>
        <Button onClick={openCreate} className="bg-gradient-gold"><Plus className="h-4 w-4 mr-1" /> Add Project</Button>
      </div>
      <div className="relative max-w-sm"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" /></div>
      <Card className="border-border/60"><CardContent className="p-0"><Table><TableHeader><TableRow><TableHead>Title</TableHead><TableHead className="hidden md:table-cell">Category</TableHead><TableHead className="hidden lg:table-cell">Client</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
        <TableBody>{loading ? <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground">Loading...</TableCell></TableRow> :
          filtered.length === 0 ? <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground">No projects.</TableCell></TableRow> :
          filtered.map((item) => (
            <TableRow key={item.id}><TableCell className="font-medium">{item.title}</TableCell><TableCell className="hidden md:table-cell text-muted-foreground">{item.category}</TableCell><TableCell className="hidden lg:table-cell text-muted-foreground">{item.client_name}</TableCell>
            <TableCell><span className={`text-xs px-2 py-0.5 rounded-full ${item.is_published ? "bg-emerald-100 text-emerald-700" : "bg-muted text-muted-foreground"}`}>{item.is_published ? "Published" : "Draft"}</span></TableCell>
            <TableCell className="text-right space-x-1"><Button variant="ghost" size="icon" onClick={() => openEdit(item)}><Pencil className="h-4 w-4" /></Button>
              <AlertDialog><AlertDialogTrigger asChild><Button variant="ghost" size="icon" className="text-destructive"><Trash2 className="h-4 w-4" /></Button></AlertDialogTrigger><AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Delete "{item.title}"?</AlertDialogTitle><AlertDialogDescription>This cannot be undone.</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction onClick={() => remove(item.id)} className="bg-destructive text-destructive-foreground">Delete</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog>
            </TableCell></TableRow>))}</TableBody></Table></CardContent></Card>

      <Dialog open={isOpen} onOpenChange={setIsOpen}><DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto"><DialogHeader><DialogTitle className="font-display">{editItem ? "Edit Project" : "Add Project"}</DialogTitle></DialogHeader>
        <div className="space-y-4">
          <div><label className="text-sm font-medium font-body">Title</label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
          <div><label className="text-sm font-medium font-body">Slug</label><Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} /></div>
          <div><label className="text-sm font-medium font-body">Category</label><Input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} /></div>
          <div><label className="text-sm font-medium font-body">Client Name</label><Input value={form.client_name} onChange={(e) => setForm({ ...form, client_name: e.target.value })} /></div>
          <div><label className="text-sm font-medium font-body">Description</label><Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={4} /></div>
          <div><label className="text-sm font-medium font-body">Cover Image URL</label><Input value={form.cover_image_url} onChange={(e) => setForm({ ...form, cover_image_url: e.target.value })} /></div>
          <div><label className="text-sm font-medium font-body">Completion Date</label><Input type="date" value={form.completion_date} onChange={(e) => setForm({ ...form, completion_date: e.target.value })} /></div>
          <div className="flex items-center gap-3"><Switch checked={form.is_published} onCheckedChange={(v) => setForm({ ...form, is_published: v })} /><label className="text-sm font-body">Published</label></div>
          <Button onClick={handleSubmit} className="w-full bg-gradient-gold">{editItem ? "Update" : "Create"}</Button>
        </div></DialogContent></Dialog>
    </div>
  );
};

export default AdminPortfolioPage;
