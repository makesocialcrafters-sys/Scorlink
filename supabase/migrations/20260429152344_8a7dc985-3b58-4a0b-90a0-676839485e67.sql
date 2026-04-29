CREATE TYPE public.player_league AS ENUM ('Hobbyliga','Stadtliga','Landesliga','Regionalliga','3. Liga','Akademie');

UPDATE public.profiles SET league = 'Hobbyliga' WHERE league IS NULL OR league NOT IN ('Hobbyliga','Stadtliga','Landesliga','Regionalliga','3. Liga','Akademie');

ALTER TABLE public.profiles
  ALTER COLUMN league TYPE public.player_league USING league::public.player_league;