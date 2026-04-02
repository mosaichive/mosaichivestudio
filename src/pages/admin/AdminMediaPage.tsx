import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useAdminCrud } from "@/hooks/useAdminCrud";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Upload, Trash2, Search, FileImage, FileVideo, FileText } from "lucide-react";
import { toast } from "sonner";
import type { Tables } from "@/integrations/supabase/types";

type MediaItem = Tables<"media_library">;

const AdminMediaPage = () => {
  const { items, loading, remove, fetch } = useAdminCrud<MediaItem>("media_library");
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [uploading, setUploading] = useState(false);

  const filtered = items.filter((m) => m.file_name.toLowerCase().includes(search.toLowerCase()));

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || !user) return;
    setUploading(true);
    for (const file of Array.from(files)) {
      const path = `${Date.now()}_${file.name}`;
      const { error: uploadError } = await supabase.storage.from("media").upload(path, file);
      if (uploadError) { toast.error(`Failed to upload ${file.name}`); continue; }
      const { data: urlData } = supabase.storage.from("media").getPublicUrl(path);
      await supabase.from("media_library").insert({
        file_name: file.name, file_url: urlData.publicUrl, file_type: file.type,
        file_size: file.size, bucket_name: "media", owner_id: user.id,
      });
    }
    toast.success("Upload complete!");
    setUploading(false);
    fetch();
    e.target.value = "";
  };

  const getIcon = (type: string | null) => {
    if (type?.startsWith("image")) return <FileImage className="h-8 w-8 text-blue-500" />;
    if (type?.startsWith("video")) return <FileVideo className="h-8 w-8 text-violet-500" />;
    return <FileText className="h-8 w-8 text-amber-500" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="font-display text-2xl font-bold">Media Library</h1><p className="text-sm text-muted-foreground font-body">Upload and manage files</p></div>
        <label className="cursor-pointer">
          <Button className="bg-gradient-gold pointer-events-none" disabled={uploading}><Upload className="h-4 w-4 mr-1" /> {uploading ? "Uploading..." : "Upload Files"}</Button>
          <input type="file" multiple className="hidden" onChange={handleUpload} accept="image/*,video/*,application/pdf,.doc,.docx" />
        </label>
      </div>
      <div className="relative max-w-sm"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input placeholder="Search files..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" /></div>

      {loading ? <div className="text-muted-foreground">Loading...</div> :
        filtered.length === 0 ? <div className="text-center text-muted-foreground py-12">No files uploaded yet.</div> :
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filtered.map((item) => (
            <Card key={item.id} className="border-border/60 overflow-hidden group">
              <CardContent className="p-3 space-y-2">
                <div className="aspect-square bg-muted/30 rounded flex items-center justify-center overflow-hidden">
                  {item.file_type?.startsWith("image") ? (
                    <img src={item.file_url} alt={item.file_name} className="w-full h-full object-cover" />
                  ) : getIcon(item.file_type)}
                </div>
                <p className="text-xs font-medium truncate font-body">{item.file_name}</p>
                <p className="text-xs text-muted-foreground">{item.file_size ? `${(item.file_size / 1024).toFixed(1)} KB` : ""}</p>
                <AlertDialog>
                  <AlertDialogTrigger asChild><Button variant="ghost" size="sm" className="w-full text-destructive opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 className="h-3 w-3 mr-1" /> Delete</Button></AlertDialogTrigger>
                  <AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Delete {item.file_name}?</AlertDialogTitle><AlertDialogDescription>This cannot be undone.</AlertDialogDescription></AlertDialogHeader>
                  <AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction onClick={() => remove(item.id)} className="bg-destructive text-destructive-foreground">Delete</AlertDialogAction></AlertDialogFooter></AlertDialogContent>
                </AlertDialog>
              </CardContent>
            </Card>
          ))}
        </div>
      }
    </div>
  );
};

export default AdminMediaPage;
