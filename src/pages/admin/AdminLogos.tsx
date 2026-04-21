import React, { useState } from 'react';
import { useClientLogos, ClientLogoRow } from '@/hooks/useStudioContent';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Plus, Trash2, GripVertical, Loader2 } from 'lucide-react';
import ImageUploader from '@/components/admin/ImageUploader';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from '@/components/ui/dialog';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  DndContext, closestCenter, PointerSensor, useSensor, useSensors, DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext, arrayMove, useSortable, verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface FormState {
  id?: string;
  name: string;
  logo_url: string | null;
  link_url: string;
  featured: boolean;
  published: boolean;
}
const blank: FormState = { name: '', logo_url: null, link_url: '', featured: false, published: true };

const Row = ({ logo, onEdit, onDelete }: { logo: ClientLogoRow; onEdit: (l: ClientLogoRow) => void; onDelete: (l: ClientLogoRow) => void }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: logo.id });
  const style = { transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.5 : 1 };
  return (
    <div ref={setNodeRef} style={style} className="flex items-center gap-3 p-3 rounded-lg border border-border bg-card">
      <button {...attributes} {...listeners} className="touch-none cursor-grab active:cursor-grabbing text-foreground/40 hover:text-foreground p-2">
        <GripVertical size={16} />
      </button>
      <div className="w-16 h-12 rounded-md bg-muted flex items-center justify-center overflow-hidden flex-shrink-0">
        {logo.logo_url ? <img src={logo.logo_url} alt="" className="max-w-full max-h-full object-contain" /> : <span className="text-xs text-foreground/40 px-1 text-center">No logo</span>}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-foreground truncate">{logo.name}</p>
        <p className="text-xs text-foreground/60 truncate">
          {logo.featured && <span className="text-secondary">Featured · </span>}
          {logo.published ? 'Published' : 'Draft'}
        </p>
      </div>
      <Button variant="outline" size="sm" onClick={() => onEdit(logo)}>Edit</Button>
      <Button variant="outline" size="sm" onClick={() => onDelete(logo)}><Trash2 size={14} /></Button>
    </div>
  );
};

const AdminLogos = () => {
  const { data: logos } = useClientLogos();
  const { toast } = useToast();
  const [editing, setEditing] = useState<FormState | null>(null);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<ClientLogoRow | null>(null);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));
  const list = logos ?? [];

  const openNew = () => { setEditing(blank); setOpen(true); };
  const openEdit = (l: ClientLogoRow) => {
    setEditing({ id: l.id, name: l.name, logo_url: l.logo_url, link_url: l.link_url ?? '', featured: l.featured, published: l.published });
    setOpen(true);
  };

  const save = async () => {
    if (!editing) return;
    if (!editing.name) { toast({ title: 'Name required', variant: 'destructive' }); return; }
    setSaving(true);
    const payload = {
      name: editing.name, logo_url: editing.logo_url,
      link_url: editing.link_url || null, featured: editing.featured, published: editing.published,
    };
    const { error } = editing.id
      ? await supabase.from('client_logos').update(payload).eq('id', editing.id)
      : await supabase.from('client_logos').insert({ ...payload, position: list.length + 1 });
    setSaving(false);
    if (error) { toast({ title: 'Failed', description: error.message, variant: 'destructive' }); return; }
    toast({ title: editing.id ? 'Updated' : 'Created' });
    setOpen(false);
  };

  const handleDragEnd = async (e: DragEndEvent) => {
    if (!e.over || e.active.id === e.over.id) return;
    const oldIdx = list.findIndex((p) => p.id === e.active.id);
    const newIdx = list.findIndex((p) => p.id === e.over!.id);
    const reordered = arrayMove(list, oldIdx, newIdx);
    await Promise.all(reordered.map((p, i) => supabase.from('client_logos').update({ position: i + 1 }).eq('id', p.id)));
    toast({ title: 'Order saved' });
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    await supabase.from('client_logos').delete().eq('id', deleteTarget.id);
    toast({ title: 'Deleted' });
    setDeleteTarget(null);
  };

  return (
    <div className="space-y-8">
      <header className="flex items-center justify-between flex-wrap gap-6">
        <div>
          <p className="eyebrow mb-2">Trust signals</p>
          <h1 className="font-display text-3xl md:text-4xl">Client logos</h1>
        </div>
        <Button onClick={openNew}><Plus size={16} /> New logo</Button>
      </header>

      {list.length === 0 ? (
        <div className="luxe-card p-12 text-center bg-card">
          <p className="text-foreground/60">No logos yet.</p>
        </div>
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={list.map((p) => p.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-2">
              {list.map((l) => <Row key={l.id} logo={l} onEdit={openEdit} onDelete={setDeleteTarget} />)}
            </div>
          </SortableContext>
        </DndContext>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>{editing?.id ? 'Edit logo' : 'New logo'}</DialogTitle></DialogHeader>
          {editing && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Name *</Label>
                <Input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Link (optional)</Label>
                <Input value={editing.link_url} onChange={(e) => setEditing({ ...editing, link_url: e.target.value })} placeholder="https://" />
              </div>
              <ImageUploader
                value={editing.logo_url}
                onChange={(url) => setEditing({ ...editing, logo_url: url })}
                folder="logos"
                label="Logo image (transparent PNG/SVG ideal)"
                aspect="aspect-[3/2]"
              />
              <div className="flex items-center justify-between">
                <Label>Featured</Label>
                <Switch checked={editing.featured} onCheckedChange={(v) => setEditing({ ...editing, featured: v })} />
              </div>
              <div className="flex items-center justify-between">
                <Label>Published</Label>
                <Switch checked={editing.published} onCheckedChange={(v) => setEditing({ ...editing, published: v })} />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={save} disabled={saving}>{saving && <Loader2 className="animate-spin" size={14} />} Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteTarget} onOpenChange={(o) => !o && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete logo?</AlertDialogTitle>
            <AlertDialogDescription>This cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminLogos;
