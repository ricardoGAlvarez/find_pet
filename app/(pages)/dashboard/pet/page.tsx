"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Phone,
  Mail,
  MapPin,
  Heart,
  Share2,
  AlertTriangle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { usePet } from "hooks/pet/getPet";


export default function Pet() {
  const {
    pet: petData,
    isLoading,
    isError,
  } = usePet("cmfuntpxz0001vthww7u0b1np");

  const isPerdido = "perdido";

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto  px-4 py-8">
        <div className="max-w-8xl mx-auto">
          {/* Estado de alerta si está perdido */}
          {isPerdido && (
            <Card className="mb-6 border-red-200 bg-red-50 flex flex-col justify-center">
              <CardContent className="">
                <div className="flex items-center gap-3 text-red-700">
                  <AlertTriangle className="h-5 w-5" />
                  <div>
                    <p className="font-semibold">🚨 MASCOTA PERDIDA</p>
                    <p className="text-sm">
                      {/* Perdida el {petData?.fechaPerdida} en {petData?.ubicacionPerdida} */}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Columna izquierda - Foto y acciones */}
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="pt-6 text-center">
                  {/* Foto de la mascota */}
                  <div className="relative mb-6">
                    <Avatar className="w-48 h-48 mx-auto border-4 border-primary/20 shadow-lg">
                      {/* <AvatarImage src={petData?.image || "/placeholder.svg"} alt={petData?.name} /> */}
                      <AvatarFallback className="text-4xl">🐾</AvatarFallback>
                    </Avatar>
                    {isPerdido && (
                      <Badge className="absolute -top-2 -right-2 bg-red-500 text-white">
                        Perdido
                      </Badge>
                    )}
                  </div>

                  <h1 className="text-3xl font-bold text-primary mb-2">
                    {petData?.name}
                  </h1>
                  <p className="text-muted-foreground mb-4">
 {petData?.age} meses
                  </p>

                  {/* Botones de acción */}
                  <div className="space-y-3">
                    {isPerdido && (
                      <Button className="w-full" size="lg">
                        <Phone className="mr-2 h-4 w-4" />
                        Contactar Dueño
                      </Button>
                    )}
                    <Button variant="outline" className="w-full bg-transparent">
                      <Share2 className="mr-2 h-4 w-4" />
                      Compartir Perfil
                    </Button>
                    {/* <Button variant="ghost" className="w-full">
                      <Heart className="mr-2 h-4 w-4" />
                      Guardar en Favoritos
                    </Button> */}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Columna derecha - Información detallada */}
            <div className="lg:col-span-2 space-y-6">
              {/* Información básica */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    🐾 Información de la Mascota
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Especie
                      </p>
                      <p className="font-semibold">{petData?.type}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Raza
                      </p>
                      <p className="font-semibold">{petData?.breed}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Edad
                      </p>
                      <p className="font-semibold">{petData?.age}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Color
                      </p>
                      <p className="font-semibold">{petData?.color}</p>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">
                      Descripción
                    </p>
                    <p className="text-sm leading-relaxed">{petData?.description}</p>
                  </div>

                  {/* <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">Características</p>
                    <div className="flex flex-wrap gap-2">
                      {petData?.caracteristicas.map((caracteristica, index) => (
                        <Badge key={index} variant="secondary">
                          {caracteristica}
                        </Badge>
                      ))}
                    </div>
                  </div> */}
                </CardContent>
              </Card>

              {/* Información del dueño */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    👤 Información del Dueño
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="font-semibold text-lg">
                      {petData?.owner.name}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{petData?.owner.phone}</span>
                    </div>
                    {/* <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{petData?.owner.email}</span>
                    </div> */}
                    <div className="flex items-center gap-3">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{petData?.owner.address}</span>
                    </div>
                  </div>

                  {isPerdido && (
                    <>
                      <Separator />
                      <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                        <p className="text-sm font-medium text-red-800 mb-2">
                          Información de Pérdida
                        </p>
                        {petData?.foundPets?.length > 0 ? (
                          <div>
                            {petData.foundPets.map((fp: any) => (
                              <div
                                className="text-sm text-red-700 flex flex-col"
                                key={fp.id}
                              >
                                <strong>Descripcion: {fp.description}</strong>
                                <strong>Ultimo lugar visto: {fp.location}</strong>
                                <strong>
                                  Fecha de ultima vista: {new Date(fp.dateFound).toLocaleDateString()}
                                </strong>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p>No hay reportes</p>
                        )}
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
