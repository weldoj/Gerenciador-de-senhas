"use client";

import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Eye, EyeOff, Mail, User, Lock } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

// Custom Hook para cadastro
type RegisterUserData = {
  nome: string;
  email: string;
  username: string;
  senha: string;
};

export function useRegisterUser() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  async function registerUser({ nome, email, username, senha }: RegisterUserData) {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome, email, username, senha }),
      });

      if (!response.ok) {
        throw new Error("Erro ao registrar usuário");
      }
      const criaQrCode = await fetch("http://127.0.0.1:8000/api/ativar-2fa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });
      console.log(criaQrCode)

      setSuccess(true);


    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return { registerUser, loading, error, success }; 
}

export function CadastroCard() {
  const { registerUser, loading, error, success } = useRegisterUser(); // Usando o hook
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState<RegisterUserData>({
    nome: "",
    email: "",
    username: "",
    senha: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await registerUser(formData);
  };

  return (
    <Card className="w-full max-w-5xl border-transparent bg-background p-6 text-black">
      <div className="mb-4 flex flex-col items-center">
        <div className="flex items-center justify-center rounded-lg p-2">
          <Image
            src="/BankSafe.png"
            width={64}
            height={64}
            alt="Avatar"
            className="rounded-full bg-gray-900"
          />
        </div>
        <h2 className="mt-2 text-xl font-semibold">Meus Dados</h2>
      </div>

      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 flex items-center text-gray-400">
              <User className="mr-2" /> Username:
            </label>
            <Input
              type="text"
              name="username"
              placeholder="Seu username"
              value={formData.username}
              onChange={handleChange}
              className="rounded-full bg-white text-black"
            />
          </div>

          <div>
            <label className="mb-1 flex items-center text-gray-400">
              <Mail className="mr-2" /> Email:
            </label>
            <Input
              type="email"
              name="email"
              placeholder="seuemail@email.com"
              value={formData.email}
              onChange={handleChange}
              className="rounded-full bg-white text-black"
            />
          </div>

          <div className="relative">
            <label className="mb-1 flex items-center text-gray-400">
              <Lock className="mr-2" /> Senha:
            </label>
            <Input
              type={showPassword ? "text" : "password"}
              name="senha"
              placeholder="Sua senha"
              value={formData.senha}
              onChange={handleChange}
              className="rounded-full bg-white pr-10 text-black"
            />
            <button
              type="button"
              className="absolute right-3 top-10 text-gray-400"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>

          <div className="relative">
            <label className="mb-1 flex items-center text-gray-400">
              <Lock className="mr-2" /> Confirme a senha:
            </label>
            <Input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmSenha"
              placeholder="Confirme sua senha"
              className="rounded-full bg-white pr-10 text-black"
            />
            <button
              type="button"
              className="absolute right-3 top-10 text-gray-400"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Registrando..." : "Salvar minha conta"}
          </Button>
          <Button
            variant="outline"
            className="w-full border-gray-600 text-gray-400 hover:bg-white"
          >
            Cancelar
          </Button>
        </form>

        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">Registro bem-sucedido!</p>}
      </CardContent>
    </Card>
  );
}
