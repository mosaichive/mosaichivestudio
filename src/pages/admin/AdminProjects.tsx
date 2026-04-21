import React, { useState } from 'react';
import { useProjects, ProjectRow } from '@/hooks/useStudioContent';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Plus, GripVertical, Pencil, Trash2, Star, Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
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

const SortableRow = ({
  project,
  onToggleFeatured,
  onTogglePublished,
  onDelete,
}: {
  project: ProjectRow;
  onToggleFeatured: (p: ProjectRow) => void;
  onTogglePublished: (p: ProjectRow) => void;
  onDelete: (p: ProjectRow) => void;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: project.id,
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-3 p-3 rounded-lg border border-border bg-card hover:border-secondary/40 transition-colors"
    >
      <button
        {...attributes}
        {...listeners}
        className="touch-none cursor-grab active:cursor-grabbing text-foreground/40 hover:text-foreground p-2"
        aria-label="Drag"
      >
        <GripVertical size={16} />
      </button>
      <div className="w-14 h-14 rounded-md overflow-hidden bg-muted flex-shrink-0">
        {project.cover_url && (
          <img src={project.cover_url} alt="" className="w-full h-full object-cover" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-foreground truncate">{project.title}</p>
        <p className="text-xs text-foreground/60 truncate">
          {project.client} · {project.industry}
        </p>
      </div>
      <button
        onClick={() => onToggleFeatured(project)}
        className={`p-2 rounded-md transition-colors ${
          project.featured ? 'text-secondary' : 'text-foreground/30 hover:text-foreground/60'
        }`}
        title={project.featured ? 'Featured' : 'Mark as featured'}
      >
        <Star size={16} fill={project.featured ? 'currentColor' : 'none'} />
      </button>
      <button
        onClick={() => onTogglePublished(project)}
        className={`p-2 rounded-md transition-colors ${
          project.published ? 'text-foreground/70' : 'text-foreground/30'
        }`}
        title={project.published ? 'Published' : 'Draft'}
      >
        {project.published ? <Eye size={16} /> : <EyeOff size={16} />}
      </button>
      <Link to={`/admin/projects/${project.id}`}>
        <Button variant="outline" size="sm">
          <Pencil size={14} />
        </Button>
      </Link>
      <Button variant="outline" size="sm" onClick={() => onDelete(project)}>
        <Trash2 size={14} />
      </Button>
    </div>
  );
};

const AdminProjects = () => {
  const { data: projects } = useProjects();
  const { toast } = useToast();
  const [deleteTarget, setDeleteTarget] = useState<ProjectRow | null>(null);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  const list = projects ?? [];

  const handleDragEnd = async (e: DragEndEvent) => {
    if (!e.over || e.active.id === e.over.id) return;
    const oldIdx = list.findIndex((p) => p.id === e.active.id);
    const newIdx = list.findIndex((p) => p.id === e.over!.id);
    const reordered = arrayMove(list, oldIdx, newIdx);
    // Persist new positions
    try {
      await Promise.all(
        reordered.map((p, i) =>
          supabase.from('projects').update({ position: i + 1 }).eq('id', p.id)
        )
      );
      toast({ title: 'Order saved' });
    } catch {
      toast({ title: 'Failed to save order', variant: 'destructive' });
    }
  };

  const toggleFeatured = async (p: ProjectRow) => {
    await supabase.from('projects').update({ featured: !p.featured }).eq('id', p.id);
  };
  const togglePublished = async (p: ProjectRow) => {
    await supabase.from('projects').update({ published: !p.published }).eq('id', p.id);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    const { error } = await supabase.from('projects').delete().eq('id', deleteTarget.id);
    if (error) {
      toast({ title: 'Failed to delete', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Project deleted' });
    }
    setDeleteTarget(null);
  };

  return (
    <div className="space-y-8">
      <header className="flex items-center justify-between gap-6 flex-wrap">
        <div>
          <p className="eyebrow mb-2">Content</p>
          <h1 className="font-display text-3xl md:text-4xl">Projects & case studies</h1>
          <p className="mt-2 text-sm text-foreground/60">
            Drag to reorder. Star to feature on the homepage.
          </p>
        </div>
        <Link to="/admin/projects/new">
          <Button>
            <Plus size={16} /> New project
          </Button>
        </Link>
      </header>

      {list.length === 0 ? (
        <div className="luxe-card p-12 text-center bg-card">
          <p className="text-foreground/60 mb-4">No projects yet.</p>
          <Link to="/admin/projects/new">
            <Button>
              <Plus size={16} /> Create your first
            </Button>
          </Link>
        </div>
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={list.map((p) => p.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-2">
              {list.map((p) => (
                <SortableRow
                  key={p.id}
                  project={p}
                  onToggleFeatured={toggleFeatured}
                  onTogglePublished={togglePublished}
                  onDelete={setDeleteTarget}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}

      <AlertDialog open={!!deleteTarget} onOpenChange={(o) => !o && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete project?</AlertDialogTitle>
            <AlertDialogDescription>
              This permanently removes "{deleteTarget?.title}" from your site. This cannot be undone.
            </AlertDialogDescription>
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

export default AdminProjects;
