"use client";

import { useState, useEffect } from "react";
import Navbar from "../_components/dashboard/Navbar";
import  Card  from "~/app/_components/dashboard/Card";

export interface User {
  userName: string;
  nome: string;
  senha: string;
}

export interface User1 {
  nome: string;
  senha: string;
}

interface ClientData {
  user_id: number;
  username: string;
  email: string;
  senha: string;
  expiresAt: number;
}


export default function AddPasswordModal() {
  const [clientData, setClientData] = useState<ClientData | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [websiteName, setWebsiteName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);

  

  // Recupera os dados do cliente do localStorage
  useEffect(() => {
    const storedData = localStorage.getItem("user");

    if (storedData) {
      const parsedData: ClientData = JSON.parse(storedData);
      // Verifica se o token expirou
      if (Date.now() < parsedData.expiresAt) {
        setClientData(parsedData);
      } else {
        console.warn("Sessão expirada. Faça login novamente.");
        localStorage.removeItem("user"); // Remove os dados expirados
      }
    }
  }, []);

  useEffect(() => {
    console.log("Dados do cliente atualizados:", clientData);
  }, [clientData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!clientData) {
      setError("Erro: Usuário não encontrado. Faça login novamente.");
      return;
    }
  
    const payload = {
      user_id: clientData.user_id,
      site: websiteName || null, // Se vazio, envia null
      email: clientData.email || null, // Se vazio, envia null
      password: password || null, // Se vazio, envia null
      url: "", // 🔥 Enviando um valor vazio
      url_image: "", // 🔥 Enviando um valor vazio
    };
  
    try {
      const response = await fetch("http://127.0.0.1:8000/api/store_password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        throw new Error("Erro ao salvar a senha.");
      }
  
      setIsOpen(false);
      setWebsiteName("");
      setPassword("");
      setError("");
      alert("Senha salva com sucesso! ✅");
    } catch (err) {
      console.error("Erro ao conectar ao servidor:", err);
      setError("Erro ao conectar ao servidor.");
    }
  };


  useEffect(() => {
    const fetchUserPasswords = async () => {
      if (!clientData || !clientData.user_id) return; // Aguarda `clientData` ser carregado
  
      try {
        const response = await fetch(`http://localhost:8000/api/get_senhas/${clientData.user_id}`);
  
        if (!response.ok) {
          throw new Error("Erro ao buscar senhas.");
        }
  
        const data = await response.json();
  
        console.log("🛠️ DEBUG: Dados da API", data);
  
        // Converte os dados da API para o formato esperado pelo componente
        const formattedUsers: User[] = data.map((item: { site: string; senha: string }) => ({
          userName: clientData.email, // Usa o email do usuário logado
          nome: item.site, // Usa o nome do site como nome do Card
          senha: item.senha
        }));
  
        setUsers(formattedUsers);
      } catch (err) {
        console.error("Erro ao carregar senhas:", err);
      }
    };
  
    fetchUserPasswords();
  }, [clientData]); // 🔥 Agora, sempre que `clientData` mudar, a API será chamada
  
  
  

  const handleDelete = async (userName: string, nome: string) => {
    if (!clientData) return;
  
    const requestData = { username: clientData.username, site: nome };
  
    try {
      const response = await fetch("http://localhost:8000/api/delete_password", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });
  
      const data = await response.text();
      console.log("🛠️ DEBUG: Resposta do backend", data);
  
      if (response.ok) {
        alert("Senha deletada com sucesso!");
  
        // 🔥 Atualiza os dados chamando a API novamente
        
      } else {
        alert(`Erro: ${data}`);
      }
    } catch (err) {
      alert("Erro ao deletar senha. Verifique sua conexão.");
    }
  };
  

  return (
    <>
      <Navbar/>
       <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.length > 0 ? (
          users.map((user) => (
            <Card
              key={`${user.userName}-${user.nome}`} // Garante chave única
              userName={clientData?.username || ""}
              nome={user.nome}
              senha={user.senha}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <p className="text-gray-600">Nenhuma senha salva.</p>
        )}
      </div>
    </div>
  
      {/* Botão para abrir o modal */}
      <button
        className="fixed bottom-8 right-8 h-12 w-12 rounded-full bg-white text-black hover:bg-gray-100 shadow-lg"
        onClick={() => setIsOpen(true)}
      >
        +
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
            <h2 className="mb-4 text-2xl font-bold">Adicionar Nova Senha</h2>

            {/* Verifica se os dados do cliente existem antes de exibir o formulário */}
            {clientData ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="websiteName" className="block text-sm font-medium">
                    Nome do Site
                  </label>
                  <input
                    id="websiteName"
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={websiteName}
                    onChange={(e) => setWebsiteName(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium">
                    Email (usado para login)
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="w-full p-2 border border-gray-300 rounded bg-gray-100"
                    value={clientData?.email || ""}
                    disabled
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium">
                    Senha do Site
                  </label>
                  <input
                    id="password"
                    type="password"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                {error && <p className="text-red-500">{error}</p>}

                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    className="px-4 py-2 border rounded text-gray-700"
                    onClick={() => setIsOpen(false)}
                  >
                    Cancelar
                  </button>
                  <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
                    Salvar
                  </button>
                </div>
              </form>
            ) : (
              <p className="text-red-500">⚠ Sessão expirada. Faça login novamente.</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}

