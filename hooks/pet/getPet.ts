"use client"

import useSWR from "swr"

const fetcher = async (url: string) => {
  const res = await fetch(url)
  if (!res.ok) throw new Error("Error al obtener datos")
  return res.json()
}

// 🔹 Hook: obtener mascota por ID
export function usePet(id: string) {
  const { data, error, mutate, isLoading } = useSWR(
    id ? `/api/pet/${id}` : null,
    fetcher
  )

  return {
    pet: data,
    isLoading,
    isError: error,
    mutate, // útil para refrescar después de update/delete
  }
}

// 🔹 Hook: actualizar mascota
export async function updatePet(id: string, payload: any) {
  const res = await fetch(`/api/pet/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error("Error al actualizar mascota")
  return res.json()
}

// 🔹 Hook: eliminar mascota
export async function deletePet(id: string) {
  const res = await fetch(`/api/pet/${id}`, { method: "DELETE" })
  if (!res.ok) throw new Error("Error al eliminar mascota")
  return res.json()
}
