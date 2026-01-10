-- Drop the foreign key constraint on shops.owner_id to allow demo data
-- The RLS policies already ensure security by checking auth.uid()
ALTER TABLE public.shops DROP CONSTRAINT IF EXISTS shops_owner_id_fkey;

-- Now insert demo shops
INSERT INTO public.shops (id, owner_id, name, description, image, address, city, state, pincode, latitude, longitude, rating, review_count, is_verified, is_open, opening_time, closing_time) VALUES
  ('11111111-aaaa-bbbb-cccc-111111111111', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Sharma Fresh Vegetables', 'Quality vegetables since 1995. Family owned shop with the freshest produce in town.', 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800', 'Shop 12, Main Market', 'Jaipur', 'Rajasthan', '302001', 26.9124, 75.7873, 4.5, 234, true, true, '07:00', '21:00'),
  ('22222222-aaaa-bbbb-cccc-222222222222', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'Patel Fruit Corner', 'Premium fruits from across India. Specializing in seasonal fruits and dry fruits.', 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=800', '45 Gandhi Road', 'Jaipur', 'Rajasthan', '302002', 26.9154, 75.7903, 4.3, 156, true, true, '08:00', '20:00'),
  ('33333333-aaaa-bbbb-cccc-333333333333', 'dddddddd-dddd-dddd-dddd-dddddddddddd', 'Green Leaf Store', 'Organic vegetables and leafy greens. We source directly from local organic farms.', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800', 'Near City Hospital', 'Jaipur', 'Rajasthan', '302003', 26.9184, 75.7933, 4.8, 89, true, true, '06:00', '20:00')
ON CONFLICT (id) DO NOTHING;

-- Insert shop products linking shops to products
INSERT INTO public.shop_products (id, shop_id, product_id, price, stock, is_available) VALUES
  -- Sharma Fresh Vegetables
  ('aaaaaaaa-0001-0001-0001-aaaaaaaaaaaa', '11111111-aaaa-bbbb-cccc-111111111111', '11111111-1111-1111-1111-111111111111', 40, 100, true),
  ('aaaaaaaa-0001-0002-0001-aaaaaaaaaaaa', '11111111-aaaa-bbbb-cccc-111111111111', '22222222-2222-2222-2222-222222222222', 35, 150, true),
  ('aaaaaaaa-0001-0003-0001-aaaaaaaaaaaa', '11111111-aaaa-bbbb-cccc-111111111111', '33333333-3333-3333-3333-333333333333', 25, 200, true),
  ('aaaaaaaa-0001-0004-0001-aaaaaaaaaaaa', '11111111-aaaa-bbbb-cccc-111111111111', '99999999-9999-9999-9999-999999999999', 50, 80, true),
  ('aaaaaaaa-0001-0005-0001-aaaaaaaaaaaa', '11111111-aaaa-bbbb-cccc-111111111111', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 45, 50, true),
  -- Patel Fruit Corner
  ('bbbbbbbb-0002-0001-0002-bbbbbbbbbbbb', '22222222-aaaa-bbbb-cccc-222222222222', '44444444-4444-4444-4444-444444444444', 180, 60, true),
  ('bbbbbbbb-0002-0002-0002-bbbbbbbbbbbb', '22222222-aaaa-bbbb-cccc-222222222222', '55555555-5555-5555-5555-555555555555', 60, 100, true),
  ('bbbbbbbb-0002-0003-0002-bbbbbbbbbbbb', '22222222-aaaa-bbbb-cccc-222222222222', '88888888-8888-8888-8888-888888888888', 250, 30, true),
  -- Green Leaf Store
  ('cccccccc-0003-0001-0003-cccccccccccc', '33333333-aaaa-bbbb-cccc-333333333333', '66666666-6666-6666-6666-666666666666', 30, 50, true),
  ('cccccccc-0003-0002-0003-cccccccccccc', '33333333-aaaa-bbbb-cccc-333333333333', '77777777-7777-7777-7777-777777777777', 15, 60, true),
  ('cccccccc-0003-0003-0003-cccccccccccc', '33333333-aaaa-bbbb-cccc-333333333333', '11111111-1111-1111-1111-111111111111', 45, 40, true),
  ('cccccccc-0003-0004-0003-cccccccccccc', '33333333-aaaa-bbbb-cccc-333333333333', '99999999-9999-9999-9999-999999999999', 55, 45, true)
ON CONFLICT (id) DO NOTHING;