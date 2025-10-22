import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Phone, Mail, MapPin, PlusCircle, Edit, Calendar } from "lucide-react"
import Link from "next/link"

// Datos de ejemplo - en una app real vendrían de una base de datos
const dueñoData = {
  id: "1",
  nombre: "María González",
  foto: "/woman-with-pets-owner-portrait.jpg",
  telefono: "+34 612 345 678",
  email: "maria.gonzalez@email.com",
  direccion: "Calle Mayor 123, Madrid",
  fechaRegistro: "Marzo 2023",
  mascotas: [
    {
      id: "1",
      nombre: "Luna",
      foto: "/golden-retriever.png",
      especie: "Perro",
      raza: "Golden Retriever",
      edad: "3 años",
      estado: "perdido",
    },
    {
      id: "2",
      nombre: "Milo",
      foto: "/tabby-cat-portrait.png",
      especie: "Gato",
      raza: "Mestizo",
      edad: "2 años",
      estado: "no_perdido",
    },
    {
      id: "3",
      nombre: "Coco",
      foto: "/small-white-dog.png",
      especie: "Perro",
      raza: "Bichón Maltés",
      edad: "5 años",
      estado: "no_perdido",
    },
  ],
  estadisticas: {
    totalMascotas: 3,
    mascotasPerdidas: 1,
    añosEnPlataforma: 2,
  },
}

export default function PerfilDueño({ params }: { params: { id: string } }) {
  const mascotasPerdidas = dueñoData.mascotas.filter((m) => m.estado === "perdido")
  const mascotasSeguras = dueñoData.mascotas.filter((m) => m.estado === "no_perdido")

  return (
    <div className="min-h-screen bg-background">

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-8xl mx-auto">
          {/* Header del perfil */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                {/* Foto del dueño */}
                <Avatar className="w-32 h-32 border-4 border-primary/20 shadow-lg">
                  <AvatarImage src={dueñoData.foto || "/placeholder.svg"} alt={dueñoData.nombre} />
                  <AvatarFallback className="text-2xl">👤</AvatarFallback>
                </Avatar>

                {/* Información básica */}
                <div className="flex-1 text-center md:text-left">
                  <h1 className="text-3xl font-bold text-primary mb-2">{dueñoData.nombre}</h1>
                  <p className="text-muted-foreground mb-4">Miembro desde {dueñoData.fechaRegistro}</p>

                  <div className="flex flex-wrap gap-4 justify-center md:justify-start mb-4">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{dueñoData.telefono}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{dueñoData.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{dueñoData.direccion}</span>
                    </div>
                  </div>

                  {/* Estadísticas rápidas */}
                  <div className="flex gap-6 justify-center md:justify-start">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-primary">{dueñoData.estadisticas.totalMascotas}</p>
                      <p className="text-xs text-muted-foreground">Mascotas</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-red-500">{dueñoData.estadisticas.mascotasPerdidas}</p>
                      <p className="text-xs text-muted-foreground">Perdidas</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-secondary">{dueñoData.estadisticas.añosEnPlataforma}</p>
                      <p className="text-xs text-muted-foreground">Años</p>
                    </div>
                  </div>
                </div>

                {/* Botones de acción */}
                <div className="flex flex-col gap-2">
                  <Button>
                    <Edit className="mr-2 h-4 w-4" />
                    Editar Perfil
                  </Button>
                  <Button variant="outline">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Agregar Mascota
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Alertas de mascotas perdidas */}
          {mascotasPerdidas.length > 0 && (
            <Card className="mb-8 border-red-200 bg-red-50">
              <CardHeader>
                <CardTitle className="text-red-700 flex items-center gap-2">
                  🚨 Mascotas Perdidas ({mascotasPerdidas.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mascotasPerdidas.map((mascota) => (
                    <Link key={mascota.id} href={`/perfil-mascota/${mascota.id}`}>
                      <Card className="hover:shadow-md transition-shadow cursor-pointer">
                        <CardContent className="pt-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="w-12 h-12">
                              <AvatarImage src={mascota.foto || "/placeholder.svg"} alt={mascota.nombre} />
                              <AvatarFallback>🐾</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-semibold">{mascota.nombre}</p>
                              <p className="text-sm text-muted-foreground">{mascota.raza}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Tabs de contenido */}
          <Tabs defaultValue="mascotas" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="mascotas">🐾 Mis Mascotas</TabsTrigger>
              <TabsTrigger value="historial">📋 Historial</TabsTrigger>
              <TabsTrigger value="configuracion">⚙️ Configuración</TabsTrigger>
            </TabsList>

            {/* Tab de Mascotas */}
            <TabsContent value="mascotas" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Todas las Mascotas ({dueñoData.mascotas.length})</h2>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Agregar Nueva Mascota
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {dueñoData.mascotas.map((mascota) => (
                  <Link key={mascota.id} href={`/dashboard/pet/${mascota.id}`}>
                    <Card className="hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer">
                      <CardContent className="pt-6">
                        <div className="text-center">
                          <div className="relative mb-4">
                            <Avatar className="w-24 h-24 mx-auto border-2 border-primary/20">
                              <AvatarImage src={mascota.foto || "/placeholder.svg"} alt={mascota.nombre} />
                              <AvatarFallback>🐾</AvatarFallback>
                            </Avatar>
                            {mascota.estado === "perdido" && (
                              <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs">Perdido</Badge>
                            )}
                          </div>
                          <h3 className="font-bold text-lg mb-1">{mascota.nombre}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{mascota.raza}</p>
                          <p className="text-xs text-muted-foreground">{mascota.edad}</p>
                          <Badge variant={mascota.especie === "Perro" ? "default" : "secondary"} className="mt-2">
                            {mascota.especie === "Perro" ? "🐶" : "🐱"} {mascota.especie}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </TabsContent>

            {/* Tab de Historial */}
            <TabsContent value="historial" className="space-y-6">
              <h2 className="text-2xl font-bold">Historial de Actividad</h2>
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                      <Calendar className="h-4 w-4 text-red-500" />
                      <div>
                        <p className="font-medium text-red-700">Luna reportada como perdida</p>
                        <p className="text-sm text-red-600">15 de Enero, 2024 - Parque Central</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                      <Calendar className="h-4 w-4 text-green-500" />
                      <div>
                        <p className="font-medium text-green-700">Coco registrado en la plataforma</p>
                        <p className="text-sm text-green-600">10 de Diciembre, 2023</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                      <Calendar className="h-4 w-4 text-blue-500" />
                      <div>
                        <p className="font-medium text-blue-700">Milo registrado en la plataforma</p>
                        <p className="text-sm text-blue-600">5 de Agosto, 2023</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Tab de Configuración */}
            <TabsContent value="configuracion" className="space-y-6">
              <h2 className="text-2xl font-bold">Configuración de Cuenta</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Información Personal</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Edit className="mr-2 h-4 w-4" />
                      Editar Información Personal
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Phone className="mr-2 h-4 w-4" />
                      Cambiar Número de Teléfono
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Mail className="mr-2 h-4 w-4" />
                      Cambiar Email
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Privacidad y Seguridad</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      🔒 Cambiar Contraseña
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      🔔 Configurar Notificaciones
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      👁️ Configurar Privacidad
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

    </div>
  )
}
