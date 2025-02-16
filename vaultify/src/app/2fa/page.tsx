import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { ShieldCheck } from "lucide-react";
import Image from "next/image";

// Tipos para as props
interface VerificationPageProps {
  email: string;
  codigo2FA: string;
  setCodigo2FA: React.Dispatch<React.SetStateAction<string>>;
  handle2FAVerification: () => void;
  closeModal: () => void;
  isVerifying: boolean;
}

const VerificationPage: React.FC<VerificationPageProps> = ({
  email,
  codigo2FA,
  setCodigo2FA,
  handle2FAVerification,
  closeModal,
  isVerifying,
}) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <Card className="w-full max-w-md rounded-3xl border-2 border-blue-500/20 bg-white">
          <CardHeader className="flex flex-col items-center space-y-2 pt-8">
            <div className="rounded-full bg-blue-500/10 p-3">
              <ShieldCheck className="h-8 w-8 text-blue-500" />
            </div>
            <h1 className="text-2xl font-semibold text-gray-900">Código 2FA</h1>
            <p className="text-center text-sm text-gray-500">
              Enviamos um código para o seu e-mail: {email}
            </p>
          </CardHeader>

          <CardContent className="space-y-6 p-6">
            <input
              type="text"
              value={codigo2FA}
              onChange={(e) => setCodigo2FA(e.target.value)}
              maxLength={6}
              className="w-full p-3 rounded-lg border-2 border-gray-300"
              placeholder="Digite o código de verificação"
              disabled={isVerifying}
            />

            <div className="flex justify-between">
              <button
                onClick={closeModal}
                className="text-sm text-gray-500 hover:text-gray-700"
                disabled={isVerifying}
              >
                Fechar
              </button>
              <Button
                onClick={handle2FAVerification}
                className="w-full bg-blue-500 py-3 text-base font-semibold text-white hover:bg-blue-700"
                disabled={isVerifying}
              >
                {isVerifying ? "Verificando..." : "Verificar"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VerificationPage;
