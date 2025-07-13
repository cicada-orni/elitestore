-- trigger function

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.user_roles (user_id, role)
  values (new.id, 'user');

  insert into public.profiles (id)
  values (new.id);

  return new;
end;
$$;

create trigger on_new_user
  after insert on auth.users
  for each row execute function public.handle_new_user();

  -- auth hook function

 -- Create the auth hook function
create or replace function public.custom_access_token_hook(event jsonb)
returns jsonb
language plpgsql
stable
as $$
  declare
    user_role public.app_role;
  begin
    select role
    into user_role
    from public.user_roles
    where user_id = (event->>'user_id')::uuid;

    event := event || jsonb_build_object('user_role', user_role);

    return event;
  end;
$$;

grant execute on function public.custom_access_token_hook to supabase_auth_admin;

revoke execute on function public.custom_access_token_hook from authenticated, anon, public;

SELECT set_config('auth.hook.custom_access_token', 'custom_access_token_hook', true);