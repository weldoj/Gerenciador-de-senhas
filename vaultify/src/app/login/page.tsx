"use client"
import React, { useState } from "react";
import VerificationPage from "../2fa/page";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [codigo2FA, setCodigo2FA] = useState("");
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false); // Estado para controlar o modal
  const [isVerifying, setIsVerifying] = useState(false); // Estado para controlar o processo de verificação 2FA

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Verificando se todos os campos estão preenchidos
    if (!email || !senha) {
      setError("Todos os campos são obrigatórios.");
      return;
    }

    const loginData = {
      email: email,
      senha: senha,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (response.ok) {
        setShowModal(true); // Exibe o modal após sucesso no login
      } else {
        setError(data); // Exibe o erro recebido do backend
      }
    } catch (err) {
      setError("Erro ao realizar login.");
    }
  };

  const handle2FAVerification = async () => {
    if (!codigo2FA) {
      setError("Por favor, insira o código 2FA.");
      return;
    }

    setIsVerifying(true); // Inicia o processo de verificação

    try {
      const verificationData = {
        email: email,
        codigo2FA: codigo2FA,
      };

      const response = await fetch("http://127.0.0.1:8000/api/verify-2fa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(verificationData),
      });

      const data = await response.json();

      if (response.ok) {
        // Sucesso na verificação 2FA
        alert("Login bem-sucedido!");
        setShowModal(false); // Fecha o modal
      } else {
        setError(data); // Exibe erro de verificação
      }
    } catch (err) {
      setError("Erro ao verificar o código 2FA.");
    } finally {
      setIsVerifying(false); // Finaliza o processo de verificação
    }
  };

  const closeModal = () => {
    setShowModal(false); // Fecha o modal
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="fixed top-0 left-0 w-full h-full bg-[#403a4c]">
        <div className="relative top-0 left-0 w-full h-[175px] bg-[#7FA6A2] rounded-b-[55%]"></div>
      </div>

      {/* Container de login */}
      <div className="relative w-[550px] h-[400px] bg-transparent p-10 flex flex-col items-center transform scale-125">
        <h1 className="text-white text-2xl font-semibold text-center mb-6">
          Olá, seja bem-vindo(a)!
        </h1>

        {/* Usuário */}
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

        {/* Senha */}
        <div className="w-[500px] mb-6">
          <input
            type="password"
            placeholder="Digite sua senha"
            className="w-full h-12 bg-gray-400 rounded-full border-none text-lg text-center placeholder-gray-200 shadow-lg text-white"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>

        {/* Erro */}
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

        {/* Botão Login */}
        <button
          className="w-[300px] h-12 bg-[#0a66c2] text-white text-lg font-semibold rounded-full shadow-lg hover:bg-[#004182] transition duration-500"
          onClick={handleSubmit}
        >
          Login
        </button>

        {/* Esqueci senha */}
        <div className="mt-4 flex flex-col items-center">
          <button className="text-white text-sm border border-gray-400 px-4 py-1 rounded-full mt-2 hover:bg-gray-600 transition">
            Esqueci minha senha
          </button>

          {/* Primeiro acesso */}
          {/* <button className="text-white text-sm underline hover:text-gray-300 transition mt-2">
            Primeiro acesso
          </button> */}
        </div>
      </div>

      {/* Modal de verificação */}
        {showModal && (
          <VerificationPage 
            email={email} 
            codigo2FA={codigo2FA} 
            setCodigo2FA={setCodigo2FA} 
            handle2FAVerification={handle2FAVerification} 
            closeModal={closeModal} 
            isVerifying={isVerifying} 
          />
        )}
    </div>
  );
}
