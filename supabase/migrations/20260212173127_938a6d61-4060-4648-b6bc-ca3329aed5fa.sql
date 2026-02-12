
-- Create a function to auto-assign admin role based on phone number
CREATE OR REPLACE FUNCTION public.auto_assign_admin_role()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  -- Check if the user's phone matches admin numbers
  IF NEW.phone IN ('+919499771142', '+919586100004') THEN
    -- Only insert if no role exists yet
    IF NOT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = NEW.id) THEN
      INSERT INTO public.user_roles (user_id, role)
      VALUES (NEW.id, 'admin');
    ELSE
      -- Update existing role to admin
      UPDATE public.user_roles SET role = 'admin' WHERE user_id = NEW.id;
    END IF;
  END IF;
  RETURN NEW;
END;
$$;

-- Trigger on auth.users after insert (new signup)
CREATE TRIGGER assign_admin_on_signup
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.auto_assign_admin_role();

-- Also check on profile updates in case phone is added later
CREATE OR REPLACE FUNCTION public.auto_assign_admin_on_profile()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  user_phone text;
BEGIN
  -- Get phone from auth.users
  SELECT phone INTO user_phone FROM auth.users WHERE id = NEW.id;
  
  IF user_phone IN ('+919499771142', '+919586100004') THEN
    IF NOT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = NEW.id) THEN
      INSERT INTO public.user_roles (user_id, role)
      VALUES (NEW.id, 'admin');
    ELSE
      UPDATE public.user_roles SET role = 'admin' WHERE user_id = NEW.id;
    END IF;
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER assign_admin_on_profile_change
AFTER INSERT OR UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.auto_assign_admin_on_profile();
