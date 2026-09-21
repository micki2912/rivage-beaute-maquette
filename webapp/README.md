# Rivage Beauté — site + back-office

Version Next.js du site, avec un espace de connexion pour Béatrice
(`/admin`) permettant d'ajouter, modifier et supprimer les produits de
la boutique (nom, prix, catégorie, description, photo) sans repasser
par un développeur.

Le design, les textes et le fonctionnement du site public (panier,
bons cadeaux, prise de rendez-vous) sont les mêmes que sur la version
statique déployée sur GitHub Pages — seule la boutique est maintenant
connectée à une vraie base de données au lieu d'être codée en dur.

## Mise en route (à faire une seule fois)

### 1. Créer un projet Supabase (gratuit)

1. Va sur [supabase.com](https://supabase.com) et crée un compte + un nouveau projet.
2. Dans **Project Settings → API**, note l'**URL** du projet et la clé **anon public**.
3. Dans **SQL Editor**, colle et exécute le contenu de [`supabase/schema.sql`](./supabase/schema.sql).
4. Optionnel : exécute aussi [`supabase/seed.sql`](./supabase/seed.sql) pour pré-remplir la boutique avec les 15 produits actuels.
5. Dans **Authentication → Users → Add user**, crée le compte de Béatrice (son e-mail + un mot de passe). C'est ce compte, et lui seul, qui pourra se connecter à `/admin` — il n'y a pas d'inscription publique, volontairement.

### 2. Configurer les variables d'environnement

Copie `.env.local.example` en `.env.local` et renseigne l'URL et la clé notées à l'étape 1 :

```bash
cp .env.local.example .env.local
```

### 3. Lancer en local

```bash
npm install
npm run dev
```

Le site est sur `http://localhost:3000`, l'espace pro sur `http://localhost:3000/admin`.

### 4. Déployer sur Vercel

1. Pousse ce dossier sur GitHub (ou connecte le dépôt existant).
2. Sur [vercel.com](https://vercel.com), crée un compte, importe le dépôt, choisis `webapp` comme racine du projet si le dépôt contient d'autres dossiers.
3. Dans les réglages du projet Vercel, ajoute les deux mêmes variables d'environnement que dans `.env.local`.
4. Déploie — Vercel te donne une URL en `https://....vercel.app` (un nom de domaine personnalisé peut être branché ensuite).

## Comment ça marche

- **Site public** (`/`, `/boutique`) : pages normales, rapides, personne n'a besoin d'être connecté.
- **`/admin`** : protégé — redirige vers `/admin/login` si personne n'est connecté (vérifié à la fois par un contrôle rapide à chaque requête *et* par la base de données elle-même, qui refuse toute modification venant d'un visiteur non authentifié).
- **Photos produits** : stockées dans Supabase Storage (bucket `product-images`), gratuit jusqu'à 1 Go — largement suffisant pour un catalogue de produits.

## Structure

```
src/app/(site)/       page d'accueil + boutique publique
src/app/admin/        back-office (login, dashboard, formulaires produit)
src/lib/supabase/     connexion à Supabase (navigateur, serveur, proxy)
src/lib/products.ts   lecture des produits (utilisée par le site public et l'admin)
supabase/schema.sql   structure de la base de données à exécuter une fois
supabase/seed.sql     produits de départ (optionnel)
```
