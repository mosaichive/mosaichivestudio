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

type TeamMember = Tables<"team_members">;

const AdminTeamPage = () => {
  const { items, loading, create, update, remove } = useAdminCrud<TeamMember>("team_members", "display_order");
  const [search, setSearch] = useState("");
  const [editItem, setEditItem] = useState<TeamMember | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({ full_name: "", role_title: "", short_bio: "", photo_url: "", display_order: "0", is_published: false });

  const filtered = items.filter((s) => s.full_name.toLowerCase().includes(search.toLowerCase()));
  const openCreate = () => { setEditItem(null); setForm({ full_name: "", role_title: "", short_bio: "", photo_url: "", display_order: "0", is_published: false }); setIsOpen(true); };
  const openEdit = (item: TeamMember) => { setEditItem(item); setForm({ full_name: item.full_name, role_title: item.role_title ?? "", short_bio: item.short_bio ?? "", photo_url: item.photo_url ?? "", display_order: item.display_order.toString(), is_published: item.is_published }); setIsOpen(true); };
  const handleSubmit = async () => {
    const payload = { ...form, display_order: parseInt(form.display_order) || 0 };
    const ok = editItem ? await update(editItem.id, payload) : await create(payload);
    if (ok) setIsOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="font-display text-2xl font-bold">Team Manager</h1><p className="text-sm text-muted-foreground font-body">Manage team members</p></div>
        <Button onClick={openCreate} className="bg-gradient-gold"><Plus className="h-4 w-4 mr-1" /> Add Member</Button>
      </div>
      <div className="relative max-w-sm"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" /></div>
      <Card className="border-border/60"><CardContent className="p-0"><Table><TableHeader><TableRow><TableHead>Name</TableHead><TableHead className="hidden md:table-cell">Role</TableHead><TableHead>Order</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
        <TableBody>{loading ? <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground">Loading...</TableCell></TableRow> :
          filtered.length === 0 ? <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground">No team members.</TableCell></TableRow> :
          filtered.map((item) => (
            <TableRow key={item.id}><TableCell className="font-medium">{item.full_name}</TableCell><TableCell className="hidden md:table-cell text-muted-foreground">{item.role_title}</TableCell><TableCell>{item.display_order}</TableCell>
            <TableCell><span className={`text-xs px-2 py-0.5 rounded-full ${item.is_published ? "bg-emerald-100 text-emerald-700" : "bg-muted text-muted-foreground"}`}>{item.is_published ? "Published" : "Draft"}</span></TableCell>
            <TableCell className="text-right space-x-1"><Button variant="ghost" size="icon" onClick={() => openEdit(item)}><Pencil className="h-4 w-4" /></Button>
              <AlertDialog><AlertDialogTrigger asChild><Button variant="ghost" size="icon" className="text-destructive"><Trash2 className="h-4 w-4" /></Button></AlertDialogTrigger><AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Delete "{item.full_name}"?</AlertDialogTitle><AlertDialogDescription>This cannot be undone.</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction onClick={() => remove(item.id)} className="bg-destructive text-destructive-foreground">Delete</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog>
            </TableCell></TableRow>))}</TableBody></Table></CardContent></Card>

      <Dialog open={isOpen} onOpenChange={setIsOpen}><DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto"><DialogHeader><DialogTitle className="font-display">{editItem ? "Edit Member" : "Add Member"}</DialogTitle></DialogHeader>
        <div className="space-y-4">
          <div><label className="text-sm font-medium font-body">Full Name</label><Input value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} /></div>
          <div><label className="text-sm font-medium font-body">Role / Title</label><Input value={form.role_title} onChange={(e) => setForm({ ...form, role_title: e.target.value })} /></div>
          <div><label className="text-sm font-medium font-body">Short Bio</label><Textarea value={form.short_bio} onChange={(e) => setForm({ ...form, short_bio: e.target.value })} rows={3} /></div>
          <div><label className="text-sm font-medium font-body">Photo URL</label><Input value={form.photo_url} onChange={(e) => setForm({ ...form, photo_url: e.target.value })} /></div>
          <div><label className="text-sm font-medium font-body">Display Order</label><Input type="number" value={form.display_order} onChange={(e) => setForm({ ...form, display_order: e.target.value })} /></div>
          <div className="flex items-center gap-3"><Switch checked={form.is_published} onCheckedChange={(v) => setForm({ ...form, is_published: v })} /><label className="text-sm font-body">Published</label></div>
          <Button onClick={handleSubmit} className="w-full bg-gradient-gold">{editItem ? "Update" : "Create"}</Button>
        </div></DialogContent></Dialog>
    </div>
  );
};

export default AdminTeamPage;
