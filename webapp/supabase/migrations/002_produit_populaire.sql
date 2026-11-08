-- Jeton "Populaire" sur les produits
-- A executer UNE SEULE FOIS : Supabase (projet du site) > SQL Editor > New query > coller > Run.
--
-- Ajoute la colonne is_popular (faux par defaut) et marque "Quintessence Cream" comme populaire.
-- Ensuite, Beatrice coche ou decoche "Produit populaire" dans l'admin.
-- Le script peut etre relance sans risque : il ne touche plus a rien si la colonne existe deja.

do $$
begin
  if not exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'products' and column_name = 'is_popular'
  ) then
    alter table public.products add column is_popular boolean not null default false;
    update public.products set is_popular = true where name = 'Quintessence Cream';
  end if;
end
$$;

-- Controle : doit afficher 1 ligne (Quintessence Cream)
select name, is_popular from public.products where is_popular order by name;
