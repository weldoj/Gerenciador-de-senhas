import "~/styles/globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    const isAuthenticated = !!userData; // Verifica se há um usuário logado

    // Se o usuário NÃO estiver logado e tentar acessar uma página protegida, redireciona para login
    if (!isAuthenticated && pathname !== "/login" && pathname !== "/cadastro" && pathname !== "/") {
      router.push("/login");
      return;
    }

    // Se o usuário ESTIVER logado e tentar acessar login, cadastro ou a home, redireciona para a dashboard (ou outra página principal)
    if (isAuthenticated && (pathname === "/login" || pathname === "/cadastro" || pathname === "/")) {
      router.push("/dashboard"); // Redireciona para a página principal do usuário logado
      return;
    }

    // Verifica se o token expirou
    if (userData) {
      const { expiresAt } = JSON.parse(userData);
      if (Date.now() > expiresAt) {
        localStorage.removeItem("user"); // Expirado? Apaga os dados
        router.push("/login"); // Redireciona para login  
      }
    }
  }, [pathname]);

  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
