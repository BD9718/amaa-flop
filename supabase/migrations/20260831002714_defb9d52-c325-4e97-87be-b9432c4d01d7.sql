-- Split public read policies so anonymous visitors never invoke has_role
DROP POLICY "Public can read published projects" ON public.projects;
CREATE POLICY "Anon can read published projects" ON public.projects
  FOR SELECT TO anon USING (is_published);
CREATE POLICY "Users can read projects" ON public.projects
  FOR SELECT TO authenticated USING (is_published OR public.has_role(auth.uid(), 'admin'::app_role));

DROP POLICY "Public can read published news" ON public.news;
CREATE POLICY "Anon can read published news" ON public.news
  FOR SELECT TO anon USING (is_published);
CREATE POLICY "Users can read news" ON public.news
  FOR SELECT TO authenticated USING (is_published OR public.has_role(auth.uid(), 'admin'::app_role));

-- user_roles must be readable by the caller for an invoker-rights role check
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;

-- has_role no longer needs elevated rights: RLS on user_roles already scopes rows to the caller
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO authenticated, service_role;