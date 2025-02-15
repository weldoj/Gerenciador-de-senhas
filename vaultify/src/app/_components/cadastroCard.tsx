"use client";

import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Eye, EyeOff, Mail, User, Lock } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

export function CadastroCard() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  return (
    <Card className="w-full max-w-5xl border-transparent bg-background p-6 text-black">
      <div className="mb-4 flex flex-col items-center">
        <div className="flex items-center justify-center rounded-lg p-2">
          <Image
            src="/BankSafe.png"
            width={64}
            height={64}
            alt="Avatar"
            className="rounded-full bg-gray-900"
          ></Image>
        </div>
        <h2 className="mt-2 text-xl font-semibold">Meus Dados</h2>
      </div>

      <CardContent className="space-y-4">
        <div>
          <label className="mb-1 flex items-center text-gray-400">
            <User className="mr-2" /> Username:
          </label>
          <Input
            type="text"
            placeholder="Seu username"
            className="rounded-full bg-white text-black"
          />
        </div>
        <div>
          <label className="mb-1 flex items-center text-gray-400">
            <Mail className="mr-2" /> Email:
          </label>
          <Input
            type="email"
            placeholder="seuemail@email.com"
            className="rounded-full bg-white text-black"
          />
        </div>
        <div className="relative">
          <label className="mb-1 flex items-center text-gray-400">
            <Lock className="mr-2" /> Senha:
          </label>
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Sua senha"
            className="rounded-full bg-white pr-10 text-black"
          />
          <button
            type="button"
            className="absolute right-3 top-10 text-gray-400"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </button>
        </div>
        <div className="relative">
          <label className="mb-1 flex items-center text-gray-400">
            <Lock className="mr-2" /> Confirme a senha:
          </label>
          <Input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirme sua senha"
            className="rounded-full bg-white pr-10 text-black"
          />
          <button
            type="button"
            className="absolute right-3 top-10 text-gray-400"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <EyeOff /> : <Eye />}
          </button>
        </div>

        <Button className="w-full bg-blue-600 hover:bg-blue-700">
          Salvar minha conta
        </Button>
        <Button
          variant="outline"
          className="w-full border-gray-600 text-gray-400 hover:bg-white"
        >
          Cancelar
        </Button>
      </CardContent>
    </Card>
  );
}

// "use client"
// import { useState } from "react";

// type RegisterUserData = {
//   nome: string;
//   email: string;
//   username: string;
//   senha: string;
// };

// export function useRegisterUser() {
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);
//   const [success, setSuccess] = useState<boolean>(false);

//   async function registerUser({ nome, email, username, senha }: RegisterUserData) {
//     setLoading(true);
//     setError(null);
//     setSuccess(false);

//     try {
//       const response = await fetch("http://127.0.0.1:8000/api/register", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ nome, email, username, senha }),
//       });

//       if (!response.ok) {
//         throw new Error("Erro ao registrar usuário");
//       }
//       console.log(response.body)
//       setSuccess(true);
//     } catch (error: any) {
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   }

//   return { registerUser, loading, error, success }; // 🔹 Aqui garantimos que um objeto seja retornado
// }

// export function CadastroCard() {
//   const { registerUser, loading, error, success } = useRegisterUser(); // ✅ Agora o TypeScript reconhece registerUser
//   const [formData, setFormData] = useState<RegisterUserData>({
//     nome: "",
//     email: "",
//     username: "",
//     senha: "",
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     await registerUser(formData);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <input
//         type="text"
//         name="nome"
//         placeholder="Nome"
//         value={formData.nome}
//         onChange={handleChange}
//         required
//         className="input"
//       />
//       <input
//         type="email"
//         name="email"
//         placeholder="Email"
//         value={formData.email}
//         onChange={handleChange}
//         required
//         className="input"
//       />
//       <input
//         type="text"
//         name="username"
//         placeholder="Username"
//         value={formData.username}
//         onChange={handleChange}
//         required
//         className="input"
//       />
//       <input
//         type="password"
//         name="senha"
//         placeholder="Senha"
//         value={formData.senha}
//         onChange={handleChange}
//         required
//         className="input"
//       />
//       <button type="submit" disabled={loading} className="btn-primary">
//         {loading ? "Registrando..." : "Registrar"}
//       </button>
//       {error && <p className="text-red-500">{error}</p>}
//       {success && <p className="text-green-500">Registro bem-sucedido!</p>}
//     </form>
//   );
// }
