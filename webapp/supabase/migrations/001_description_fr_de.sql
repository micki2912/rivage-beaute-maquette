-- Descriptions bilingues FR / DE
-- A executer UNE SEULE FOIS : Supabase (projet du site) > SQL Editor > New query > coller > Run.
--
-- Contexte : jusqu'ici, chaque description contenait le francais PUIS l'allemand dans le meme champ.
-- Ce script les separe : description = francais, description_de = allemand.
-- Rien n'est supprime : l'ancien texte complet est d'abord copie dans description_backup.
-- Le script peut etre relance sans risque : il ne retouche pas un produit deja decoupe.

begin;

alter table public.products add column if not exists description_de text;
alter table public.products add column if not exists description_backup text;

-- 1) Sauvegarde de l'ancien texte (une seule fois par produit)
update public.products
set description_backup = description
where description_backup is null
  and description is not null;

-- 2) Decoupe : n = nombre de lignes en francais, le reste est l'allemand
with cuts(id, n) as (
  values
    ('e7b95455-b41e-4ff5-9c49-3a0d27eeac7d'::uuid, 2),  -- Cell Defense Cream Q10
    ('7cf11c2e-15ff-40cc-af4c-a0879a4cdfc1'::uuid, 2),  -- SOS Recovery Cream 24h
    ('f8862850-6bf4-4f8e-b6bf-88c31f4d6ba5'::uuid, 4),  -- Hydra Restore Cream — Acide hyaluronique
    ('9cc4939c-1528-408f-862a-f191eff876c4'::uuid, 1),  -- Supreme Neck & Décolleté Cream
    ('4946fc7b-4e15-4c76-88a7-dd547929a66b'::uuid, 1),  -- Bronzing Powder — Melted Sun
    ('39a2380d-aea6-405e-b332-58101e06e889'::uuid, 1),  -- Cell Defense Mask
    ('a7a958aa-3488-4f27-a068-e83184337435'::uuid, 2),  -- SOS Recovery Mask Azulen
    ('6f81d268-a70f-4e0c-bed6-db59d96bf902'::uuid, 1),  -- Mint Peeling Mask
    ('bb28ab89-589b-44c4-b43f-2aa467538b4e'::uuid, 1),  -- Probiotic Gel Cleanser
    ('a8d2d623-dc8d-401d-bfdf-366f166334e1'::uuid, 1),  -- Smoothing Toning Lotion
    ('809d5b7d-c147-4cfb-8120-af59d0d4dcff'::uuid, 2),  -- Detox Enzyme Cleanser
    ('90eb26df-7758-4b5c-8cee-14d7e969ec29'::uuid, 2),  -- Resurfacing Peel Pads — 10% AHA/BHA
    ('a2c4e219-c359-485c-a5ab-c6b2a7d44659'::uuid, 2),  -- Rebalancing Repair Serum
    ('994bb705-6d5b-4bcd-a4ee-5110a1f55f1b'::uuid, 1),  -- Quintessence Beauty Elixir
    ('54c289f7-db97-47ac-b957-71eedaa6a8c2'::uuid, 1)   -- Quintessence Cream
),
src as (
  select p.id, string_to_array(p.description_backup, E'\r\n') as arr, c.n
  from public.products p
  join cuts c on c.id = p.id
  where p.description_de is null
)
update public.products p
set description    = array_to_string(src.arr[1:src.n], E'\r\n'),
    description_de = array_to_string(src.arr[src.n + 1:cardinality(src.arr)], E'\r\n')
from src
where p.id = src.id;

commit;

-- 3) Controle : doit afficher 0 ligne (francais + allemand = texte d'origine)
select name
from public.products
where description_backup is not null
  and (description || E'\r\n' || description_de) is distinct from description_backup;
