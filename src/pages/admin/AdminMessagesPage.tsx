import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useAdminCrud } from "@/hooks/useAdminCrud";
import { Trash2, Search, Mail, MailOpen, Archive } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { Tables } from "@/integrations/supabase/types";

type Message = Tables<"contact_messages">;

const AdminMessagesPage = () => {
  const { items, loading, remove, fetch } = useAdminCrud<Message>("contact_messages");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<string>("all");

  const markAs = async (id: string, status: string, isRead: boolean) => {
    const { error } = await supabase.from("contact_messages").update({ status, is_read: isRead }).eq("id", id);
    if (error) toast.error("Failed to update");
    else { toast.success("Updated"); fetch(); }
  };

  const filtered = items.filter((m) => {
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase()) || m.email.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || m.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="space-y-6">
      <div><h1 className="font-display text-2xl font-bold">Messages</h1><p className="text-sm text-muted-foreground font-body">Manage contact form submissions</p></div>
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative max-w-sm flex-1"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" /></div>
        <div className="flex gap-2">
          {["all", "unread", "read", "archived"].map((f) => (
            <Button key={f} variant={filter === f ? "default" : "outline"} size="sm" onClick={() => setFilter(f)} className="capitalize">{f}</Button>
          ))}
        </div>
      </div>
      <Card className="border-border/60"><CardContent className="p-0"><Table><TableHeader><TableRow><TableHead>Name</TableHead><TableHead className="hidden md:table-cell">Email</TableHead><TableHead className="hidden lg:table-cell">Subject</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
        <TableBody>{loading ? <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground">Loading...</TableCell></TableRow> :
          filtered.length === 0 ? <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground">No messages.</TableCell></TableRow> :
          filtered.map((item) => (
            <TableRow key={item.id} className={!item.is_read ? "bg-primary/5" : ""}>
              <TableCell className="font-medium">{item.name}</TableCell>
              <TableCell className="hidden md:table-cell text-muted-foreground text-sm">{item.email}</TableCell>
              <TableCell className="hidden lg:table-cell text-muted-foreground text-sm">{item.subject || "—"}</TableCell>
              <TableCell><span className={`text-xs px-2 py-0.5 rounded-full ${item.status === "unread" ? "bg-primary/10 text-primary font-medium" : item.status === "archived" ? "bg-muted text-muted-foreground" : "bg-emerald-100 text-emerald-700"}`}>{item.status}</span></TableCell>
              <TableCell className="text-right space-x-1">
                {item.status === "unread" && <Button variant="ghost" size="icon" onClick={() => markAs(item.id, "read", true)} title="Mark read"><MailOpen className="h-4 w-4" /></Button>}
                {item.status === "read" && <Button variant="ghost" size="icon" onClick={() => markAs(item.id, "unread", false)} title="Mark unread"><Mail className="h-4 w-4" /></Button>}
                {item.status !== "archived" && <Button variant="ghost" size="icon" onClick={() => markAs(item.id, "archived", true)} title="Archive"><Archive className="h-4 w-4" /></Button>}
                <AlertDialog><AlertDialogTrigger asChild><Button variant="ghost" size="icon" className="text-destructive"><Trash2 className="h-4 w-4" /></Button></AlertDialogTrigger>
                <AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Delete message from {item.name}?</AlertDialogTitle><AlertDialogDescription>This cannot be undone.</AlertDialogDescription></AlertDialogHeader>
                <AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction onClick={() => remove(item.id)} className="bg-destructive text-destructive-foreground">Delete</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog>
              </TableCell></TableRow>))}</TableBody></Table></CardContent></Card>
    </div>
  );
};

export default AdminMessagesPage;
