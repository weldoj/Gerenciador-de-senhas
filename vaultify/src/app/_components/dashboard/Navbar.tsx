"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

const Navbar = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("user"); // Remove os dados do usuário
    router.push("/login"); // Redireciona para a tela de login
  };

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
      {/* Logo e título */}
      <div className="flex items-center">
        <Image src="/logo.png" alt="Logo" width={50} height={50} className="mr-3" />
        <h1 className="text-xl font-bold">Valtify</h1>
      </div>

      {/* Botão de Logout */}
      <button
        onClick={handleLogout}
        className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
