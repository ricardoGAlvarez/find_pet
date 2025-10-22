"use client";

import { useState, Fragment } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "../../lib/utils";
import { signOut, useSession } from "next-auth/react";
import {
  Users,
  Settings,
  Menu,
  X,
  User,
  LogOut,
  UserCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: UserCircle },
  { name: "Mascota", href: "/dashboard/pet", icon: Users },
  { name: "Configuración", href: "/dashboard/configuration", icon: Settings },
];

// Componente para la cabecera de la barra lateral
const SidebarHeader = () => (
  <div className="flex items-center justify-center h-16 px-4">
    <h1 className="text-xl font-bold text-primary">
      <Link href="/dashboard">SISTEMA</Link>
    </h1>
  </div>
);

// Componente para la navegación
const SidebarNav = ({ pathname }: any) => (
  <nav className="flex-1 px-4 py-6 space-y-1">
    {navigation.map((item) => {
      const isActive = pathname === item.href;
      return (
        <Link
          key={item.name}
          href={item.href}
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
            isActive
              ? "bg-primary text-primary-foreground hover:bg-primary/90"
              : "text-muted-foreground hover:bg-muted"
          )}
        >
          <item.icon className="h-5 w-5" />
          {item.name}
        </Link>
      );
    })}
  </nav>
);

// Componente para el pie de página (usuario y botón de cerrar sesión)
const SidebarFooter = ({ session }: any) => (
  <div className="border-t border-border p-4">
    <div className="flex items-center space-x-3 mb-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
        <User className="h-5 w-5" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate">
          {session?.user?.email ?? "Usuario"}
        </p>
      </div>
    </div>
    <Button
      variant="ghost"
      className="w-full justify-start text-muted-foreground hover:text-foreground"
      onClick={() => signOut({ callbackUrl: "/auth/login" })}
    >
      <LogOut className="mr-3 h-5 w-5" />
      Cerrar Sesión
    </Button>
  </div>
);

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <Fragment>
      {/* Botón de hamburguesa para móvil */}
      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 left-4 z-[99] md:hidden bg-background text-foreground shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Superposición para cerrar el menú en móvil */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar principal */}
      <div className="border sm:h-screen ">
        <aside
          className={cn(
            "fixed-left fixed inset-y-0 left-0 z-50 flex w-64 lg:h-screen flex-col bg-card lg:bg-transparent transition-transform duration-300 ease-in-out md:static md:translate-x-0",
            isOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="flex flex-col lg:h-screen">
            <SidebarHeader />
            <SidebarNav pathname={pathname} />
            <SidebarFooter session={session} />
          </div>
        </aside>
      </div>
    </Fragment>
  );
}
