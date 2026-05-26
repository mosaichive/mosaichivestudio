-- Harden admin-facing RLS policies by splitting broad ALL policies into
-- explicit per-command policies. This keeps the current schema intact while
-- making role/invite access easier to audit.

drop policy if exists "Admins manage roles" on public.user_roles;

create policy "Admins insert roles"
  on public.user_roles for insert
  to authenticated
  with check (public.has_role(auth.uid(), 'admin'));

create policy "Admins update roles"
  on public.user_roles for update
  to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

create policy "Admins delete roles"
  on public.user_roles for delete
  to authenticated
  using (public.has_role(auth.uid(), 'admin'));

drop policy if exists "Admins manage invites" on public.admin_invites;

create policy "Admins view invites"
  on public.admin_invites for select
  to authenticated
  using (public.has_role(auth.uid(), 'admin'));

create policy "Admins insert invites"
  on public.admin_invites for insert
  to authenticated
  with check (public.has_role(auth.uid(), 'admin'));

create policy "Admins update invites"
  on public.admin_invites for update
  to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

create policy "Admins delete invites"
  on public.admin_invites for delete
  to authenticated
  using (public.has_role(auth.uid(), 'admin'));
