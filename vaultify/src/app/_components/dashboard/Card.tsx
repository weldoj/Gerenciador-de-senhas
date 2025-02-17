import { useState } from "react";

interface User {
  userName: string;
  nome: string;
  senha: string;
  onDelete: (userName: string, nome: string) => void;
}

const Card = ({ userName, nome, senha, onDelete }: User) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center">
      <div className="w-20 h-20 bg-gray-300 flex items-center justify-center rounded-full text-3xl font-bold mb-4">
        {nome.charAt(0).toUpperCase()}
      </div>
      <h3 className="text-lg font-semibold">{nome}</h3>

      <div className="mt-2 flex items-center space-x-2">
        <span className="text-gray-600">{showPassword ? senha : "******"}</span>
        <button
          onClick={() => setShowPassword(!showPassword)}
          className="text-blue-500 hover:text-blue-700"
        >
          👁️
        </button>
      </div>

      <button
        onClick={() => onDelete(userName, nome)}
        className="mt-4 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
      >
        ❌ Deletar
      </button>
    </div>
  );
};

export default Card;
