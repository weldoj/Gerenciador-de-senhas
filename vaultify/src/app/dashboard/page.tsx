"use client";

import { Plus } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { PasswordCard } from "../_components/password-cards";
import { AppLayout } from "../_components/layouts/app-layout";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// export default function Home() {
//   const router = useRouter();
//   const [isOpen, setIsOpen] = useState(false);
//   const [websiteName, setWebsiteName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   // Se precisar tratar imagem, pode usar o state abaixo
//   const [image, setImage] = useState<File | null>(null);

//   // Ao montar, tenta carregar os dados do usuário do localStorage
//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       const userData = JSON.parse(storedUser);
//       setEmail(userData.email); // pré-preenche o email
//     } else {
//       // Se não houver usuário autenticado, redireciona para o login
//       router.push("/login");
//     }
//   }, [router]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");

//     // Verifica se todos os campos obrigatórios foram preenchidos
//     if (!websiteName || !email || !password) {
//       setError("Todos os campos são obrigatórios.");
//       return;
//     }

//     // Recupera os dados do usuário armazenados no localStorage
//     const storedUser = localStorage.getItem("user");
//     if (!storedUser) {
//       setError("Usuário não autenticado.");
//       router.push("/login");
//       return;
//     }
//     const userData = JSON.parse(storedUser);

//     // Prepara os dados a serem enviados para a rota /store_password
//     const passwordData = {
//       user_id: userData.user_id,
//       site: websiteName,
//       email: email,
//       password: password,
//     };

//     try {
//       const response = await fetch("http://localhost:8000/store_password", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(passwordData),
//       });

//       if (!response.ok) {
//         const errText = await response.text();
//         setError(errText);
//         return;
//       }

//       const result = await response.json();
//       console.log("Senha armazenada com sucesso:", result);
//       // Fecha o modal e limpa os campos
//       setIsOpen(false);
//       setWebsiteName("");
//       setPassword("");
//     } catch (error) {
//       console.error("Erro:", error);
//       setError("Erro ao salvar senha.");
//     }
//   };

//   // Dados para exibir alguns cartões de senha (exemplo)
//   interface PasswordData {
//     name: string;
//     logo: string;
//   }

//   const dados: PasswordData[] = [];

//   return (
//     <TooltipProvider>
//       <AppLayout activeItem="passwords">
//         <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
//           {dados.map((item) => (
//             <PasswordCard key={item.name} name={item.name} logo={item.logo} />
//           ))}
//         </div>
//         <Tooltip>
//           <TooltipTrigger asChild>
//             <div>
//               <Button
//                 className="fixed bottom-8 right-8 h-12 w-12 rounded-full bg-white p-0 text-black hover:bg-gray-100"
//                 onClick={() => setIsOpen(true)}
//                 size="icon"
//               >
//                 <Plus className="h-6 w-6" />
//               </Button>
//               {isOpen && (
//                 <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
//                   <div className="w-full max-w-md rounded-lg bg-white p-8">
//                     <h2 className="mb-4 text-2xl font-bold">
//                       Website Information
//                     </h2>
//                     <form onSubmit={handleSubmit} className="space-y-4">
//                       <div>
//                         <Label htmlFor="websiteName">Website Name</Label>
//                         <Input
//                           id="websiteName"
//                           type="text"
//                           value={websiteName}
//                           onChange={(e) => setWebsiteName(e.target.value)}
//                           required
//                         />
//                       </div>
//                       <div>
//                         <Label htmlFor="email">Email</Label>
//                         <Input
//                           id="email"
//                           type="email"
//                           value={email}
//                           onChange={(e) => setEmail(e.target.value)}
//                           required
//                         />
//                       </div>
//                       <div>
//                         <Label htmlFor="password">Password</Label>
//                         <Input
//                           id="password"
//                           type="password"
//                           value={password}
//                           onChange={(e) => setPassword(e.target.value)}
//                           required
//                         />
//                       </div>
//                       {error && <p className="text-red-500">{error}</p>}
//                       <div className="flex justify-end space-x-2">
//                         <Button
//                           type="button"
//                           variant="outline"
//                           onClick={() => setIsOpen(false)}
//                         >
//                           Cancel
//                         </Button>
//                         <Button type="submit">Submit</Button>
//                       </div>
//                     </form>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </TooltipTrigger>
//           <TooltipContent side="left">
//             <p className="text-white">Adicionar nova senha</p>
//           </TooltipContent>
//         </Tooltip>
//       </AppLayout>
//     </TooltipProvider>
//   );
// }



interface ClientData {
  user_id: number;
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
      site: websiteName,
      email: clientData.email,
      password: password,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/api/store_password?=", {
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

  return (
    <>
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
