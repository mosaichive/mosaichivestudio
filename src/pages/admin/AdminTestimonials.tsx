import React, { useState } from 'react';
import { useTestimonials, TestimonialRow } from '@/hooks/useStudioContent';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Plus, Trash2, GripVertical, Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
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
  quote: string;
  author: string;
  role: string;
  company: string;
  rating: number;
  published: boolean;
}

const blank: FormState = { quote: '', author: '', role: '', company: '', rating: 5, published: true };

const Row = ({
  t, onEdit, onDelete,
}: {
  t: TestimonialRow;
  onEdit: (t: TestimonialRow) => void;
  onDelete: (t: TestimonialRow) => void;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: t.id });
  const style = { transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.5 : 1 };

  return (
    <div ref={setNodeRef} style={style} className="flex items-start gap-3 p-4 rounded-lg border border-border bg-card">
      <button {...attributes} {...listeners} className="touch-none cursor-grab active:cursor-grabbing text-foreground/40 hover:text-foreground p-1">
        <GripVertical size={16} />
      </button>
      <div className="flex-1 min-w-0">
        <p className="font-display text-base leading-snug text-foreground line-clamp-2">"{t.quote}"</p>
        <p className="mt-2 text-xs text-foreground/60">
          {t.author} · {[t.role, t.company].filter(Boolean).join(' · ')}
          {!t.published && <span className="ml-2 text-secondary">(draft)</span>}
        </p>
      </div>
      <Button variant="outline" size="sm" onClick={() => onEdit(t)}>Edit</Button>
      <Button variant="outline" size="sm" onClick={() => onDelete(t)}><Trash2 size={14} /></Button>
    </div>
  );
};

const AdminTestimonials = () => {
  const { data: testimonials } = useTestimonials();
  const { toast } = useToast();
  const [editing, setEditing] = useState<FormState | null>(null);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<TestimonialRow | null>(null);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));
  const list = testimonials ?? [];

  const openNew = () => { setEditing(blank); setOpen(true); };
  const openEdit = (t: TestimonialRow) => {
    setEditing({
      id: t.id, quote: t.quote, author: t.author, role: t.role ?? '',
      company: t.company ?? '', rating: t.rating, published: t.published,
    });
    setOpen(true);
  };

  const save = async () => {
    if (!editing) return;
    if (!editing.quote || !editing.author) {
      toast({ title: 'Quote and author are required', variant: 'destructive' });
      return;
    }
    setSaving(true);
    const payload = {
      quote: editing.quote, author: editing.author,
      role: editing.role || null, company: editing.company || null,
      rating: editing.rating, published: editing.published,
    };
    const { error } = editing.id
      ? await supabase.from('testimonials').update(payload).eq('id', editing.id)
      : await supabase.from('testimonials').insert({ ...payload, position: list.length + 1 });
    setSaving(false);
    if (error) {
      toast({ title: 'Failed', description: error.message, variant: 'destructive' });
      return;
    }
    toast({ title: editing.id ? 'Updated' : 'Created' });
    setOpen(false);
  };

  const handleDragEnd = async (e: DragEndEvent) => {
    if (!e.over || e.active.id === e.over.id) return;
    const oldIdx = list.findIndex((p) => p.id === e.active.id);
    const newIdx = list.findIndex((p) => p.id === e.over!.id);
    const reordered = arrayMove(list, oldIdx, newIdx);
    await Promise.all(reordered.map((p, i) => supabase.from('testimonials').update({ position: i + 1 }).eq('id', p.id)));
    toast({ title: 'Order saved' });
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    await supabase.from('testimonials').delete().eq('id', deleteTarget.id);
    toast({ title: 'Deleted' });
    setDeleteTarget(null);
  };

  return (
    <div className="space-y-8">
      <header className="flex items-center justify-between flex-wrap gap-6">
        <div>
          <p className="eyebrow mb-2">Content</p>
          <h1 className="font-display text-3xl md:text-4xl">Testimonials</h1>
        </div>
        <Button onClick={openNew}><Plus size={16} /> New testimonial</Button>
      </header>

      {list.length === 0 ? (
        <div className="luxe-card p-12 text-center bg-card">
          <p className="text-foreground/60">No testimonials yet.</p>
        </div>
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={list.map((p) => p.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-2">
              {list.map((t) => <Row key={t.id} t={t} onEdit={openEdit} onDelete={setDeleteTarget} />)}
            </div>
          </SortableContext>
        </DndContext>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editing?.id ? 'Edit testimonial' : 'New testimonial'}</DialogTitle>
          </DialogHeader>
          {editing && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Quote *</Label>
                <Textarea value={editing.quote} onChange={(e) => setEditing({ ...editing, quote: e.target.value })} rows={4} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Author *</Label>
                  <Input value={editing.author} onChange={(e) => setEditing({ ...editing, author: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Role</Label>
                  <Input value={editing.role} onChange={(e) => setEditing({ ...editing, role: e.target.value })} />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label>Company</Label>
                  <Input value={editing.company} onChange={(e) => setEditing({ ...editing, company: e.target.value })} />
                </div>
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
            <AlertDialogTitle>Delete testimonial?</AlertDialogTitle>
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

export default AdminTestimonials;
