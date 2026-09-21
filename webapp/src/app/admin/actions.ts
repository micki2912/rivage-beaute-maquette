'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

// ---------- auth ----------

export async function login(_prevState: unknown, formData: FormData) {
  const email = String(formData.get('email') || '').trim()
  const password = String(formData.get('password') || '')

  if (!email || !password) {
    return { error: 'E-mail et mot de passe requis.' }
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    return { error: 'E-mail ou mot de passe incorrect.' }
  }

  redirect('/admin')
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/admin/login')
}

// ---------- helpers ----------

async function requireUser() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) throw new Error('Non authentifié.')
  return { supabase, user }
}

async function uploadImageIfPresent(
  supabase: Awaited<ReturnType<typeof createClient>>,
  formData: FormData
): Promise<string | null | undefined> {
  const file = formData.get('image')
  if (!(file instanceof File) || file.size === 0) return undefined // no new image provided

  const ext = file.name.split('.').pop() || 'jpg'
  const path = `${crypto.randomUUID()}.${ext}`
  const { error } = await supabase.storage
    .from('product-images')
    .upload(path, file, { contentType: file.type, upsert: false })

  if (error) throw new Error("Échec de l'envoi de la photo : " + error.message)

  const {
    data: { publicUrl },
  } = supabase.storage.from('product-images').getPublicUrl(path)
  return publicUrl
}

function readProductFields(formData: FormData) {
  const name = String(formData.get('name') || '').trim()
  const price = parseFloat(String(formData.get('price') || '0'))
  const category = String(formData.get('category') || 'Autres').trim() || 'Autres'
  const description = String(formData.get('description') || '').trim() || null

  if (!name) throw new Error('Le nom du produit est requis.')
  if (!Number.isFinite(price) || price < 0) throw new Error('Prix invalide.')

  return { name, price, category, description }
}

// ---------- product CRUD ----------

export async function createProduct(_prevState: unknown, formData: FormData) {
  try {
    const { supabase } = await requireUser()
    const fields = readProductFields(formData)
    const image_url = (await uploadImageIfPresent(supabase, formData)) ?? null

    const { error } = await supabase.from('products').insert({ ...fields, image_url })
    if (error) throw new Error(error.message)
  } catch (e) {
    return { error: e instanceof Error ? e.message : 'Erreur inconnue.' }
  }

  revalidatePath('/admin')
  revalidatePath('/boutique')
  redirect('/admin')
}

export async function updateProduct(
  id: string,
  _prevState: unknown,
  formData: FormData
) {
  try {
    const { supabase } = await requireUser()
    const fields = readProductFields(formData)
    const newImageUrl = await uploadImageIfPresent(supabase, formData)

    const update: Record<string, unknown> = { ...fields }
    if (newImageUrl !== undefined) update.image_url = newImageUrl

    const { error } = await supabase.from('products').update(update).eq('id', id)
    if (error) throw new Error(error.message)
  } catch (e) {
    return { error: e instanceof Error ? e.message : 'Erreur inconnue.' }
  }

  revalidatePath('/admin')
  revalidatePath('/boutique')
  redirect('/admin')
}

export async function deleteProduct(formData: FormData) {
  const { supabase } = await requireUser()
  const id = String(formData.get('id') || '')
  const imageUrl = String(formData.get('imageUrl') || '')

  if (!id) return

  await supabase.from('products').delete().eq('id', id)

  if (imageUrl) {
    const path = imageUrl.split('/product-images/')[1]
    if (path) await supabase.storage.from('product-images').remove([path])
  }

  revalidatePath('/admin')
  revalidatePath('/boutique')
}
