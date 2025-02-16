"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [codigo2FA, setCodigo2FA] = useState(""); // Campo para o código 2FA
  const [error, setError] = useState("");
  const router = useRouter();

  // Enviar os dados de login
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !senha) {
      setError("Todos os campos são obrigatórios.");
      return;
    }

    // Enviar email, senha e (se houver) o código 2FA
    const loginData = {
      email: email,
      senha: senha,
      ...(codigo2FA && { codigo_2fa: codigo2FA }), // Adiciona o código 2FA se existir
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();
      console.log("🛠️ DEBUG: Resposta do login", data);

      if (response.ok) {
        router.push("/");
      } else {
        setError(data);
      }
    } catch (err) {
      setError("Erro ao realizar login.");
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="fixed top-0 left-0 w-full h-full bg-[#403a4c]">
        <div className="relative top-0 left-0 w-full h-[175px] bg-[#7FA6A2] rounded-b-[55%]"></div>
      </div>

      {/* Container de login */}
      <div className="relative w-[550px] h-[450px] bg-transparent p-10 flex flex-col items-center transform scale-125">
        <h1 className="text-white text-2xl font-semibold text-center mb-6">
          Olá, seja bem-vindo(a)!
        </h1>

        {/* Campo de e-mail */}
        <div className="w-[500px] mb-3">
          <input
            type="email"
            placeholder="Digite seu e-mail"
            className="w-full h-12 bg-gray-400 rounded-full border-none text-lg text-center placeholder-gray-200 shadow-lg text-white"
            spellCheck={false}
            autoCorrect="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Campo de senha */}
        <div className="w-[500px] mb-3">
          <input
            type="password"
            placeholder="Digite sua senha"
            className="w-full h-12 bg-gray-400 rounded-full border-none text-lg text-center placeholder-gray-200 shadow-lg text-white"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>

        {/* Campo para Código 2FA (Opcional) */}
        <div className="w-[500px] mb-6">
          <input
            type="text"
            placeholder="Código 2FA (opcional)"
            className="w-full h-12 bg-gray-400 rounded-full border-none text-lg text-center placeholder-gray-200 shadow-lg text-white"
            maxLength={6}
            value={codigo2FA}
            onChange={(e) => {
              // Permite apenas números e limita a 6 dígitos
              const value = e.target.value.replace(/\D/g, "").slice(0, 6);
              setCodigo2FA(value);
            }}
          />
        </div>

        {/* Exibição de erros */}
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

        {/* Botão de login */}
        <button
          className="w-[300px] h-12 bg-[#0a66c2] text-white text-lg font-semibold rounded-full shadow-lg hover:bg-[#004182] transition duration-500"
          onClick={handleSubmit}
        >
          Login
        </button>
      </div>
    </div>
  );
}
