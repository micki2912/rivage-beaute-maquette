-- Optional: run after schema.sql to pre-fill the boutique with the current
-- 15 JPR/XC products, so the shop isn't empty on first launch. Béatrice can
-- then edit/replace them from the back-office.

insert into public.products (name, price, category, description, sort_order) values
  ('Probiotic Gel Cleanser', 45, 'Nettoyants & exfoliants', null, 1),
  ('Smoothing Toning Lotion', 40, 'Nettoyants & exfoliants', null, 2),
  ('Detox Enzyme Cleanser', 55, 'Nettoyants & exfoliants', null, 3),
  ('Resurfacing Peel Pads — 10% AHA/BHA', 80, 'Nettoyants & exfoliants', null, 4),
  ('Rebalancing Repair Serum', 75, 'Sérums & essences', null, 5),
  ('Cell Defense Cream Q10', 70, 'Crèmes & soins hydratants', null, 6),
  ('SOS Recovery Cream 24h', 70, 'Crèmes & soins hydratants', null, 7),
  ('Hydra Restore Cream — Acide hyaluronique', 86, 'Crèmes & soins hydratants', null, 8),
  ('Supreme Neck & Décolleté Cream', 75, 'Crèmes & soins hydratants', null, 9),
  ('Cell Defense Mask', 68, 'Masques', null, 10),
  ('SOS Recovery Mask Azulen', 67, 'Masques', null, 11),
  ('Mint Peeling Mask', 50, 'Masques', null, 12),
  ('Quintessence Beauty Elixir', 169, 'Soins d''exception', null, 13),
  ('Quintessence Cream', 130, 'Soins d''exception', null, 14),
  ('Bronzing Powder — Melted Sun', 42, 'Maquillage', null, 15)
on conflict do nothing;
