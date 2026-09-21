'use client'

export default function DeleteProductButton({ name }: { name: string }) {
  return (
    <button
      type="submit"
      className="btn ghost small admin-delete-btn"
      onClick={(e) => {
        if (!confirm(`Supprimer « ${name} » définitivement ?`)) {
          e.preventDefault()
        }
      }}
    >
      Supprimer
    </button>
  )
}
