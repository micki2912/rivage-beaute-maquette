// Single source of truth for the site's public URL, so it's easy to switch
// once a custom domain (rivagebeaute.ch) replaces the vercel.app one.
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://rivage-beaute-maquette.vercel.app'

export const PHONE_TEL = 'tel:+41798382223'
export const PHONE_DISPLAY = '079 838 22 23'

// Google rating shown near the booking button — update by hand if it changes.
export const GOOGLE_RATING = '4,85'
export const GOOGLE_REVIEWS_URL = 'https://share.google/ACTIXfR3yiheV3YTY'
