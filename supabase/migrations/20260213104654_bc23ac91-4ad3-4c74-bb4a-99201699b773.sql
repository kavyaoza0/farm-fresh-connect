
-- Allow admins to view all orders
CREATE POLICY "Admins can view all orders"
ON public.orders
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- Allow admins to update orders
CREATE POLICY "Admins can update all orders"
ON public.orders
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Allow admins to view all shops (including closed)
CREATE POLICY "Admins can view all shops"
ON public.shops
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- Allow admins to update shops (for verification)
CREATE POLICY "Admins can update all shops"
ON public.shops
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Allow admins to view all order items
CREATE POLICY "Admins can view all order items"
ON public.order_items
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- Allow admins to view all bulk order requests
CREATE POLICY "Admins can view all bulk order requests"
ON public.bulk_order_requests
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));
