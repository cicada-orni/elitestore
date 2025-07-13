-- POLICIES FOR: user_roles table
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins can manage user roles" ON public.user_roles;
CREATE POLICY "Admins can manage user roles"
ON public.user_roles FOR ALL
TO authenticated
USING ((auth.jwt() ->> 'user_role') = 'admin')
WITH CHECK ((auth.jwt() ->> 'user_role') = 'admin');

DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;
CREATE POLICY "Users can view their own roles"
ON public.user_roles FOR SELECT
TO authenticated
USING(auth.uid() = user_id);

-- POLICIES FOR: role_permissions table
ALTER TABLE public.role_permissions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Admins can manage role permissions" ON public.role_permissions;
CREATE POLICY "Admins can manage role permissions" ON public.role_permissions
FOR ALL
TO authenticated
USING ((auth.jwt() ->> 'user_role') = 'admin')
WITH CHECK ((auth.jwt() ->> 'user_role') = 'admin');

DROP POLICY IF EXISTS "Authenticated users can view permissions" ON public.role_permissions;
CREATE POLICY "Authenticated users can view permissions"
ON public.role_permissions FOR SELECT
TO authenticated
USING (true);

-- POLICIES FOR: products table
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can view products" ON public.products;
CREATE POLICY "Users can view products" 
ON public.products FOR SELECT
TO authenticated, anon
USING (true);

DROP POLICY IF EXISTS "Admins have full access to products" ON public.products;
CREATE POLICY "Admins have full access to products"
ON public.products FOR ALL
USING ((auth.jwt() ->> 'user_role') = 'admin')
WITH CHECK ((auth.jwt() ->> 'user_role') = 'admin');

-- POLICIES FOR: categories
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can view categories" ON public.categories;
CREATE POLICY "Public can view categories"
ON public.categories FOR SELECT
TO authenticated, anon
USING (true);

DROP POLICY IF EXISTS "Admins have full access to categories" ON public.categories;
CREATE POLICY "Admins have full access to categories"
ON public.categories FOR ALL
TO authenticated
USING ((auth.jwt() ->> 'user_role') = 'admin')
WITH CHECK ((auth.jwt() ->> 'user_role') = 'admin');

-- POLICIES FOR: product_variants
ALTER TABLE public.product_variants ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can view product variants" ON public.product_variants;
CREATE POLICY "Public can view product variants"
ON public.product_variants FOR SELECT
TO authenticated, anon
USING (true);

DROP POLICY IF EXISTS "Admins have full access to product variants" ON public.product_variants;
CREATE POLICY "Admins have full access to product variants"
ON public.product_variants FOR ALL
TO authenticated
USING ((auth.jwt() ->> 'user_role') = 'admin')
WITH CHECK ((auth.jwt() ->> 'user_role') = 'admin');

-- POLICIES FOR: promotions
ALTER TABLE public.promotions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can view promotions" ON public.promotions;
CREATE POLICY "Public can view promotions"
ON public.promotions FOR SELECT
TO authenticated, anon
USING (true);

DROP POLICY IF EXISTS "Admins have full access to promotions" ON public.promotions;
CREATE POLICY "Admins have full access to promotions"
ON public.promotions FOR ALL
TO authenticated
USING ((auth.jwt() ->> 'user_role') = 'admin')
WITH CHECK ((auth.jwt() ->> 'user_role') = 'admin');

-- POLICIES FOR: promotion_rules
ALTER TABLE public.promotion_rules ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can view promotion rules" ON public.promotion_rules;
CREATE POLICY "Public can view promotion rules"
ON public.promotion_rules FOR SELECT
TO authenticated, anon
USING (true);

DROP POLICY IF EXISTS "Admins have full access to promotion rules" ON public.promotion_rules;
CREATE POLICY "Admins have full access to promotion rules"
ON public.promotion_rules FOR ALL
TO authenticated
USING ((auth.jwt() ->> 'user_role') = 'admin')
WITH CHECK ((auth.jwt() ->> 'user_role') = 'admin');