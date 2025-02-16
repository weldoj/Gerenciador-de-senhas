import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { ShieldCheck, Lock, User } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Navbar */}
      <nav className="w-full flex justify-between items-center p-6 bg-gray-800 shadow-lg">
        <div className="text-2xl font-bold text-blue-500">Vaultify</div>
        <div>
          <Button className="bg-blue-600 hover:bg-blue-700">Login</Button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="text-center py-20 px-6">
        <div className="flex items-center justify-center mb-6">
          <ShieldCheck className="h-16 w-16 text-blue-500" />
        </div>
        <h1 className="text-5xl font-bold text-white">Bem-vindo ao Vaultify</h1>
        <p className="text-xl text-gray-400 mt-4 max-w-2xl mx-auto">
          O gerenciador de senhas mais seguro e confiável do mercado. Proteja suas credenciais com tecnologia de ponta e mantenha seus dados sempre seguros.
        </p>
      </header>

       {/* Benefícios */}
      <section className="py-16 bg-gray-800 text-center px-6">
        <h2 className="text-3xl font-semibold text-white mb-8">Por que escolher o Vaultify?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card className="bg-gray-700 p-6 rounded-xl shadow-md">
            <Lock className="h-12 w-12 text-blue-500 mx-auto" />
            <h3 className="text-xl font-semibold mt-4">Criptografia Avançada</h3>
            <p className="text-gray-400 mt-2">Utilizamos **Argon2** para proteger suas senhas com o mais alto nível de segurança.</p>
          </Card>
          <Card className="bg-gray-700 p-6 rounded-xl shadow-md">
            <ShieldCheck className="h-12 w-12 text-blue-500 mx-auto" />
            <h3 className="text-xl font-semibold mt-4">Autenticação 2FA</h3>
            <p className="text-gray-400 mt-2">Garanta acesso seguro à sua conta com autenticação de dois fatores.</p>
          </Card>
          <Card className="bg-gray-700 p-6 rounded-xl shadow-md">
            <User className="h-12 w-12 text-blue-500 mx-auto" />
            <h3 className="text-xl font-semibold mt-4">Tecnologia em Rust</h3>
            <p className="text-gray-400 mt-2">Segurança e desempenho máximo com nossa infraestrutura construída em **Rust**.</p>
          </Card>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-20">
        <h2 className="text-3xl font-semibold text-white">Pronto para proteger suas senhas?</h2>
        <p className="text-lg text-gray-400 mt-4 max-w-2xl mx-auto">
          Crie sua conta agora mesmo e tenha total controle sobre sua segurança digital.
        </p>
        <div className="mt-6">
          <Button className="bg-blue-600 py-4 px-6 text-lg font-semibold hover:bg-blue-700">
            Criar Conta Agora
          </Button>
        </div>
      </section>

     

  {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 text-center py-6 mt-16">
        <p>© 2025 Vaultify. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}