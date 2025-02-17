"use client";

import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Eye, EyeOff, Mail, User, Lock } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { Mensagem } from "~/app/_components/cadastro/Mensagem";

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
              className=""
            ></Image>
          </div>
          <h2 className="mt-2 text-xl font-semibold">Esqueci minha senha</h2>
        </div>

        <CardContent className="space-y-4 shadow-none">
          <div>
            <label className="mb-1 flex items-center text-gray-400">
              <Mail className="mb-2 mr-4" /> Email:
            </label>
            <Input
              type="email"
              placeholder="seuemail@email.com"
              className="rounded-full bg-white text-white"
            />
          </div>

          <Button className="w-full bg-blue-600 hover:bg-blue-700">
            Enviar Email de Recuperação
          </Button>
          <Button
            variant="outline"
            className="w-full border-gray-600 text-gray-400 hover:bg-white"
          >
            Cancelar
          </Button>
        </CardContent>
      </Card>

      <Mensagem
        msg="Um email com instruções foi enviado para 
lary********gmail..com. "
      />
    </div>
  );
}
