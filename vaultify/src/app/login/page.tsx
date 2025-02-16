"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Mensagem } from "../_components/cadastro/Mensagem";


export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [codigo2FA, setCodigo2FA] = useState(""); // Campo para o código 2FA
  const [error, setError] = useState("");
  const router = useRouter();
  const [modal, setModal] = useState(false);
  const [codigo, setCodigo] = useState(['', '', '', '', '', '']);


  

  const handleChange = (e: { target: { value: any; }; }, index: number) => {
    const { value } = e.target;
    if (/^\d*$/.test(value)) { // Verifica se o valor é numérico
      const newCodigo = [...codigo];
      newCodigo[index] = value;
      setCodigo(newCodigo);

      setCodigo2FA(newCodigo.join("")); // Atualiza o campo de código 2FA

      // Move o foco para o próximo input se o valor atual tiver 1 dígito
      if (value.length === 1 && index < 5) {
        const nextInput = document.getElementById(`codigo-${index + 1}`);
        if (nextInput) {
          nextInput.focus();
        }
      }
    }
  };

  const handleKeyDown = (e: { key: string; }, index: number) => {
    if (e.key === 'Backspace' && !codigo[index] && index > 0) {
      // Move o foco para o input anterior se Backspace for pressionado e o campo estiver vazio
      const prevInput = document.getElementById(`codigo-${index - 1}`);
      if (prevInput) {
        prevInput.focus();
      }
    }
  };
  

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

    console.log("🛠️ DEBUG: Dados de login", loginData);

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
      ;
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
      <div className="relative w-[550px] h-[450px] bg-transparent p-10 flex flex-col items-center transform scale-125 bg-[#575063] rounded-xl">

        {/* Logo */}
        <Image
          src="/logo.png"
          width={100}
          height={100}
          alt="Logo">
        </Image>

        <h1 className="text-gray-400 text-2xl font-semibold text-center mb-6">
        Entrar no Vaultify
        </h1>

        {/* Campo de e-mail */}
        <div className="w-5/6 mb-3">
          <input
            type="email"
            placeholder="Digite seu e-mail"
            className="w-full h-12 bg-slate-400 rounded-full border-none text-lg text-center placeholder-gray-200 shadow-lg "
            spellCheck={false}
            autoCorrect="off"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Campo de senha */}
        <div className="w-5/6 mb-3">
          <input
            type="password"
            placeholder="Digite sua senha"
            className="w-full h-12 bg-gray-400 rounded-full border-none text-lg text-center placeholder-gray-200 shadow-lg text-white"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>

        {/* Campo para Código 2FA 
         */}
        <div className={`absolute ${modal ? "flex" : "hidden"} items-center justify-center flex-col h-full  rounded border-none text-lg text-center placeholder-gray-200 shadow-lg  w-full z-10 bg-white `}>
          
          <button className="right-4 absolute top-2 text-red-800 font-bold" onClick={() => setModal(false)}>X</button>

          <Image
            src="/logo.png"
            width={100}
            height={100}
            alt="Microsoft Auth"
            className="mt-8"
          ></Image>
          
          <label className="text-background text-2xl m-8">Código Microsoft Auth</label>
          <div className="flex space-x-2 my-4">

            {codigo.map((num, index) => (
              <input
                key={index}
                id={`codigo-${index}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                className="w-12 h-12 text-center text-lg border border-gray-300 rounded"
                value={num}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            ))}
          </div>

          <button className=" bg-[#7FA6A2] text-white text-lg font-semibold rounded-full shadow-lg hover:bg-[#2d4240] transition duration-500 my-8 py-2 text-center px-8"
            onClick={handleSubmit}>
            Enviar
          </button>

        </div>

        

        {/* Botão de login */}
        <button
          className="w-5/6 h-12 bg-[#7FA6A2] text-white text-lg font-semibold rounded-full shadow-lg hover:bg-[#2d4240] transition duration-500 mt-8"
          onClick={() => setModal(true)}
        >
          Login
        </button>
      </div>

      {/* Exibição de erros */}
      {error && (
        <div className="text-red-500 text-sm mb-4">
          <Mensagem msg={error} />
        </div>
      )}
    </div>
  );

}
