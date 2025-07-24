CREATE TABLE public.reviews (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  product_id BIGINT NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  rating SMALLINT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- RLS POLICIES
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Allow anyone to view all reviews
CREATE POLICY "Public can view all reviews" ON public.reviews FOR SELECT TO authenticated, anon USING (true);

-- Allow authenticated users to insert their own reviews
CREATE POLICY "Authenticated users can insert reviews" ON public.reviews FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- Allow users to update their own reviews
CREATE POLICY "Users can update their own reviews" ON public.reviews FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Allow users to delete their own reviews
CREATE POLICY "Users can delete their own reviews" ON public.reviews FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Allow admin to perform any action
CREATE POLICY "Admins can manage all reviews" ON public.reviews FOR ALL TO authenticated USING ((auth.jwt() ->> 'user_role') = 'admin') WITH CHECK ((auth.jwt() ->> 'user_role') = 'admin');

-- INDEXES
CREATE INDEX idx_reviews_product_id ON public.reviews(product_id);

CREATE INDEX idx_reviews_user_id ON public.reviews(user_id);

CREATE INDEX idx_reviews_rating ON public.reviews(rating);
