-- POLICIES FOR: profiles table

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their profile" ON public.profiles;
CREATE POLICY "Users can view their profile"
ON public.profiles FOR SELECT
TO authenticated
USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
CREATE POLICY "Users can update their own profile" 
ON public.profiles FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK(auth.uid() = id)

