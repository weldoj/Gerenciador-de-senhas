"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import "~/styles/globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Páginas que NÃO precisam de login
    if (pathname === "/" || pathname === "/login" || pathname === "/cadastro") return;

    // Verificar se o usuário está logado
    const userData = localStorage.getItem("user");

    if (!userData) {
      router.push("/login"); // Se não tem dados, redireciona
      return;
    }

    const { expiresAt } = JSON.parse(userData);

    if (Date.now() > expiresAt) {
      localStorage.removeItem("user"); // Expirado? Apaga os dados
      router.push("/login"); // Redireciona para login  
    }
  }, [pathname]);

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
