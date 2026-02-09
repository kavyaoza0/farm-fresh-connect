
-- Create a trigger function to validate role inserts
CREATE OR REPLACE FUNCTION public.validate_role_insert()
RETURNS TRIGGER AS $$
BEGIN
  -- Prevent admin role self-assignment by non-admins
  IF NEW.role = 'admin' THEN
    IF NOT public.has_role(auth.uid(), 'admin') THEN
      RAISE EXCEPTION 'Admin role can only be assigned by existing admins';
    END IF;
  END IF;

  -- Prevent users from having multiple roles
  IF EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = NEW.user_id) THEN
    RAISE EXCEPTION 'User already has a role assigned';
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger
CREATE TRIGGER validate_role_before_insert
  BEFORE INSERT ON public.user_roles
  FOR EACH ROW
  EXECUTE FUNCTION public.validate_role_insert();
