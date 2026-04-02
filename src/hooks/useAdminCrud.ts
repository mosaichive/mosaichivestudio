import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type TableName = "services" | "pricing_packages" | "portfolio_projects" | "growth_plans" |
  "shop_products" | "team_members" | "contact_messages" | "page_content" |
  "seo_settings" | "media_library" | "global_settings";

export function useAdminCrud<T extends { id: string }>(table: TableName, orderBy = "created_at") {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);

  const fetch = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from(table)
      .select("*")
      .order(orderBy, { ascending: false });
    if (error) toast.error(`Failed to load ${table}`);
    else setItems((data as T[]) ?? []);
    setLoading(false);
  }, [table, orderBy]);

  useEffect(() => { fetch(); }, [fetch]);

  const create = async (item: Partial<T>) => {
    const { error } = await supabase.from(table).insert(item as any);
    if (error) { toast.error(`Failed to create: ${error.message}`); return false; }
    toast.success("Created successfully!");
    await fetch();
    return true;
  };

  const update = async (id: string, updates: Partial<T>) => {
    const { error } = await supabase.from(table).update(updates as any).eq("id", id);
    if (error) { toast.error(`Failed to update: ${error.message}`); return false; }
    toast.success("Updated successfully!");
    await fetch();
    return true;
  };

  const remove = async (id: string) => {
    const { error } = await supabase.from(table).delete().eq("id", id);
    if (error) { toast.error(`Failed to delete: ${error.message}`); return false; }
    toast.success("Deleted successfully!");
    await fetch();
    return true;
  };

  return { items, loading, fetch, create, update, remove };
}
