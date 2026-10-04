// Shop categories are free text managed by Béatrice (in French) in the admin.
// The German pages translate known ones for display; anything new falls back
// to the original name until it's added here.
const DE: Record<string, string> = {
  'crèmes & soins hydratants': 'Cremes & Feuchtigkeitspflege',
  maquillage: 'Make-up',
  masques: 'Masken',
  'nettoyants & exfoliants': 'Reinigung & Peeling',
  'sérums & essences': 'Seren & Essenzen',
  "soins d'exception": 'Exklusive Pflege',
  autres: 'Weitere Produkte',
}

export function categoryLabel(category: string, lang: 'fr' | 'de' = 'fr') {
  if (lang === 'fr') return category
  return DE[category.trim().toLowerCase()] ?? category
}
