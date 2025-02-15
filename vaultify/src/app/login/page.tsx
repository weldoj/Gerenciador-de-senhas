import React from "react";

export default function Login() {
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
              type="text"
              placeholder="Digite seu usuário"
              className="w-full h-12 bg-gray-400 rounded-full border-none text-lg text-center placeholder-gray-200 shadow-lg text-white"
              spellCheck={false}
              autoCorrect="off"
          />

        </div>

        {/* Senha */}
        <div className="w-[500px] mb-6">
          <input
            type="password"
            placeholder="Digite sua senha"
            className="w-full h-12 bg-gray-400 rounded-full border-none text-lg text-center placeholder-gray-200 shadow-lg text-white"
          />
        </div>

        {/* Botão Login */}
        <button className="w-[300px] h-12 bg-[#0a66c2] text-white text-lg font-semibold rounded-full shadow-lg hover:bg-[#004182] transition duration-500">
          Login
        </button>

        {/* Esqueci senha */}
        <div className="mt-4 flex flex-col items-center">
          <button className="text-white text-sm border border-gray-400 px-4 py-1 rounded-full mt-2 hover:bg-gray-600 transition">
            Esqueci minha senha
          </button>

          
          {/* Primeiro acesso */}
          <button className="text-white text-sm underline hover:text-gray-300 transition mt-2">
            Primeiro acesso
          </button>
        </div>
      </div>
  </div>
);
};