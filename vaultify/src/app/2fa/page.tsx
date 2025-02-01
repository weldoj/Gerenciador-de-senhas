"use client";

import { useState, type KeyboardEvent } from "react";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { ShieldCheck } from "lucide-react";
import Image from "next/image";

export default function VerificationPage() {
  const [code, setCode] = useState(Array(5).fill(""));

  const handleChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      document.getElementById(`input-${index - 1}`)?.focus();
    }
  };

  const handleResendCode = () => console.log("Resending code...");
  const handleSubmit = () => console.log("Submitting code:", code.join(""));

  return (
    <div className="bg-background flex min-h-screen flex-col items-center justify-center p-4">
      <Image
        src="/BankSafe.png"
        width={64}
        height={64}
        alt="Avatar"
        className="m-4"
      ></Image>
      <Card className="w-full max-w-md rounded-3xl border-2 border-blue-500/20 bg-white">
        <CardHeader className="flex flex-col items-center space-y-2 pt-8">
          <div className="rounded-full bg-blue-500/10 p-3">
            <ShieldCheck className="h-8 w-8 text-blue-500" />
          </div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Autenticação via código
          </h1>
          <p className="text-center text-sm text-gray-500">
            Insira o código de verificação enviado para seu email.
          </p>
        </CardHeader>

        <CardContent className="space-y-6 p-6">
          <div className="flex justify-center space-x-4">
            {code.map((digit, index) => (
              <input
                key={index}
                id={`input-${index}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="h-12 w-12 rounded-lg border-2 border-gray-200 text-center text-lg font-semibold text-gray-900 focus:border-blue-500 focus:outline-none"
              />
            ))}
          </div>

          <div className="flex flex-col items-center space-y-4">
            <button
              onClick={handleResendCode}
              className="text-sm text-blue-500 hover:text-blue-600"
            >
              Reenviar código
            </button>
            <Button
              onClick={handleSubmit}
              className="w-full bg-blue-500 py-3 text-base font-semibold text-white hover:bg-blue-700"
            >
              Enviar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
