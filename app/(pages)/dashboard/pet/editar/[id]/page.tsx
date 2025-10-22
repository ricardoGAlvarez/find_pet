"use client"

import type React from "react"

import { useState } from "react"
import { Camera, Save, X, Plus, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { Separator } from "@radix-ui/react-separator"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"

// Datos iniciales - en una app real vendrían de una base de datos
const initialData = {
  id: "1",
  nombre: "Luna",
  foto: "/golden-retriever-portrait.png",
  especie: "Perro",
  raza: "Golden Retriever",
  edad: "3",
  color: "Dorado",
  estado: "no_perdido", // "perdido" | "no_perdido"
  descripcion:
    "Luna es muy cariñosa y juguetona. Le encanta correr en el parque y jugar con otros perros. Responde a su nombre y conoce comandos básicos.",
  caracteristicas: ["Muy sociable", "Le gusta el agua", "Collar azul", "Chip identificativo"],
}

export default function EditarMascota({ params }: { params: { id: string } }) {
  const [formData, setFormData] = useState(initialData)
  const [nuevaCaracteristica, setNuevaCaracteristica] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleEstadoChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, estado: checked ? "perdido" : "no_perdido" }))
  }

  const agregarCaracteristica = () => {
    if (nuevaCaracteristica.trim()) {
      setFormData((prev) => ({
        ...prev,
        caracteristicas: [...prev.caracteristicas, nuevaCaracteristica.trim()],
      }))
      setNuevaCaracteristica("")
    }
  }

  const eliminarCaracteristica = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      caracteristicas: prev.caracteristicas.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simular guardado
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsLoading(false)
    // En una app real, aquí se guardarían los datos y se redirigiría
    alert("¡Perfil actualizado exitosamente!")
  }

  const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setFormData((prev) => ({ ...prev, foto: e.target?.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="min-h-screen bg-background">

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-8xl mx-auto">
          {/* Header de la página */}
          <div className="flex items-center gap-4 mb-8">
            <Link href={`/perfil-dueño/${params.id}`}>
              <Button variant="outline" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver al Perfil
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-primary">Editar Perfil de {formData.nombre}</h1>
              <p className="text-muted-foreground">Actualiza la información de tu mascota</p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Columna izquierda - Foto y estado */}
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">📸 Foto de Perfil</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center space-y-4">
                    {/* Foto actual */}
                    <div className="relative">
                      <Avatar className="w-48 h-48 mx-auto border-4 border-primary/20 shadow-lg">
                        <AvatarImage src={formData.foto || "/placeholder.svg"} alt={formData.nombre} />
                        <AvatarFallback className="text-4xl">🐾</AvatarFallback>
                      </Avatar>

                      {/* Botón para cambiar foto */}
                      <label className="absolute bottom-2 right-2 bg-primary text-primary-foreground p-2 rounded-full cursor-pointer hover:bg-primary/90 transition-colors">
                        <Camera className="h-4 w-4" />
                        <input type="file" accept="image/*" onChange={handleFotoChange} className="hidden" />
                      </label>
                    </div>

                    <p className="text-sm text-muted-foreground">Haz clic en el ícono de cámara para cambiar la foto</p>

                    <Separator />

                    {/* Estado perdido/no perdido */}
                    <div className="space-y-3">
                      <label className="text-base font-semibold">Estado de la Mascota</label>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">No perdido</span>
                        <Switch checked={formData.estado === "perdido"} onCheckedChange={handleEstadoChange} />
                        <span className="text-sm">Perdido</span>
                      </div>
                      {formData.estado === "perdido" && (
                        <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                          <p className="text-sm text-red-700 font-medium">
                            ⚠️ Tu mascota aparecerá como perdida en su perfil público
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Columna derecha - Formulario de información */}
              <div className="lg:col-span-2 space-y-6">
                {/* Información básica */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">🐾 Información Básica</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="nombre">Nombre de la Mascota</Label>
                        <Input
                          id="nombre"
                          value={formData.nombre}
                          onChange={(e) => handleInputChange("nombre", e.target.value)}
                          placeholder="Ej: Luna"
                        />
                      </div>
                      <div>
                        <Label htmlFor="especie">Especie</Label>
                        <Select value={formData.especie} onValueChange={(value) => handleInputChange("especie", value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Perro">Perro</SelectItem>
                            <SelectItem value="Gato">Gato</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="raza">Raza</Label>
                        <Input
                          id="raza"
                          value={formData.raza}
                          onChange={(e) => handleInputChange("raza", e.target.value)}
                          placeholder="Ej: Golden Retriever"
                        />
                      </div>
                      <div>
                        <Label htmlFor="edad">Edad (años)</Label>
                        <Input
                          id="edad"
                          type="number"
                          value={formData.edad}
                          onChange={(e) => handleInputChange("edad", e.target.value)}
                          placeholder="Ej: 3"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="color">Color</Label>
                        <Input
                          id="color"
                          value={formData.color}
                          onChange={(e) => handleInputChange("color", e.target.value)}
                          placeholder="Ej: Dorado"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="descripcion">Descripción</Label>
                      <Textarea
                        id="descripcion"
                        value={formData.descripcion}
                        onChange={(e) => handleInputChange("descripcion", e.target.value)}
                        placeholder="Describe el comportamiento y características de tu mascota..."
                        rows={4}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Características */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">✨ Características</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Características existentes */}
                    <div className="flex flex-wrap gap-2">
                      {formData.caracteristicas.map((caracteristica, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center gap-1">
                          {caracteristica}
                          <button
                            type="button"
                            onClick={() => eliminarCaracteristica(index)}
                            className="ml-1 hover:text-red-500"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>

                    {/* Agregar nueva característica */}
                    <div className="flex gap-2">
                      <Input
                        value={nuevaCaracteristica}
                        onChange={(e) => setNuevaCaracteristica(e.target.value)}
                        placeholder="Nueva característica..."
                        onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), agregarCaracteristica())}
                      />
                      <Button type="button" onClick={agregarCaracteristica} size="sm">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Botones de acción */}
                <div className="flex gap-4 justify-end">
                  <Link href={`/perfil-dueño/${params.id}`}>
                    <Button variant="outline" type="button">
                      Cancelar
                    </Button>
                  </Link>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? (
                      <>Guardando...</>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Guardar Cambios
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>

    </div>
  )
}
