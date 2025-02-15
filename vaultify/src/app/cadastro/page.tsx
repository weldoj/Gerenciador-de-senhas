"use client";

import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Eye, EyeOff, Mail, User, Lock } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { MensagemImagem } from "~/app/_components/cadastro/Mensagem";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="bg-background flex min-h-screen items-center justify-center p-4">
      <Card className="bg-background w-full max-w-5xl border-transparent p-6 text-white">
        <div className="mb-4 flex flex-col items-center">
          <div className="flex items-center justify-center rounded-lg p-2">
            <Image
              src="/BankSafe.png"
              width={64}
              height={64}
              alt="Avatar"
              className="rounded-full bg-gray-900"
            ></Image>
          </div>
          <h2 className="mt-2 text-xl font-semibold">Meus Dados</h2>
        </div>

        <CardContent className="space-y-4">
          <div>
            <label className="mb-1 flex items-center text-gray-400">
              <User className="mr-2" /> Username:
            </label>
            <Input
              type="text"
              placeholder="Seu username"
              className="rounded-full bg-white text-white"
            />
          </div>
          <div>
            <label className="mb-1 flex items-center text-gray-400">
              <Mail className="mr-2" /> Email:
            </label>
            <Input
              type="email"
              placeholder="seuemail@email.com"
              className="rounded-full bg-white text-white"
            />
          </div>
          <div className="relative">
            <label className="mb-1 flex items-center text-gray-400">
              <Lock className="mr-2" /> Senha:
            </label>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Sua senha"
              className="rounded-full bg-white pr-10 text-white"
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
              placeholder="Confirme sua senha"
              className="rounded-full bg-white pr-10 text-white"
            />
            <button
              type="button"
              className="absolute right-3 top-10 text-gray-400"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>

          <Button className="w-full bg-blue-600 hover:bg-blue-700">
            Salvar minha conta
          </Button>
          <Button
            variant="outline"
            className="w-full border-gray-600 text-gray-400 hover:bg-white"
          >
            Cancelar
          </Button>
        </CardContent>
      </Card>

      <MensagemImagem
        msg="Sua conta foi criada com sucesso! "
        src="/Smiling.png"
      />
    </div>
  );
}
