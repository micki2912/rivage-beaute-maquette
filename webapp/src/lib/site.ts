// Single source of truth for the site's public URL, so it's easy to switch
// once a custom domain (rivagebeaute.ch) replaces the vercel.app one.
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://rivage-beaute-maquette.vercel.app'
