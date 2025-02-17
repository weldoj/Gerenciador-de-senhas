"use client";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Card, CardContent } from "~/components/ui/card";
import { Eye, EyeOff, Plus, Clipboard } from "lucide-react";
import { useState } from "react";
import MenuLateral from "~/app/_components/layout/menu-lateral";
import Image from "next/image";

export default function NewPasswordPage() {
  const [password, setPassword] = useState("****************");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="bg-background flex min-h-screen">
      <main className="flex w-full flex-col items-center justify-center text-white">
        <Image src="/BankSafe.png" width={60} height={60} alt="logo"></Image>
        <h1 className="text-center text-2xl font-bold">Nova Senha</h1>
        <Card className="mt-6 w-8/12 rounded-xl border-transparent p-6">
          <CardContent className="space-y-4">
            <div>
              <label className="text-gray-400">Nome do serviço *</label>
              <Input
                type="text"
                placeholder="Amazon Prime"
                className="rounded-full bg-white text-white"
              />
            </div>
            <div>
              <label className="text-gray-400">
                Email vinculado ao serviço *
              </label>
              <Input
                type="email"
                placeholder="seuemail@email.com"
                className="rounded-full bg-white text-white"
              />
            </div>
            <div>
              <label className="text-gray-400">URL</label>
              <Input
                type="text"
                placeholder="https://"
                className="rounded-full bg-white text-white"
              />
            </div>
            <div>
              <label className="text-gray-400">Categorias</label>
              <div className="flex items-center space-x-2">
                <div className="text-background w-full min-w-max rounded-full bg-white px-4 py-2 text-sm">
                  Streaming
                </div>
              </div>
            </div>
            <div className="relative">
              <label className="text-gray-400">Senha</label>
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                className="bg-white pr-10 text-white"
                readOnly
              />
              <button
                type="button"
                className="absolute right-3 top-8 text-gray-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
              <button
                type="button"
                className="absolute right-12 top-8 text-gray-400"
              >
                <Clipboard />
              </button>
            </div>
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              Gerar senha
            </Button>
            <Button className="w-full bg-green-500 hover:bg-green-600">
              Salvar senha
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
