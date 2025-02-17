export default function MenuLateral() {
  return (
    <div>
      <aside className="flex w-64 flex-col bg-gray-800 p-4 text-white">
        <div className="flex items-center space-x-2 text-xl font-semibold text-yellow-500">
          <div className="rounded bg-yellow-600 p-2">📖</div>
          <span>Vaultify</span>
        </div>
        <nav className="mt-6 space-y-4">
          <button className="flex w-full items-center space-x-2 rounded bg-gray-700 p-2">
            📂 <span>Minhas senhas</span>
          </button>
          <button className="flex w-full items-center space-x-2 rounded bg-gray-700 p-2">
            📂 <span>Categorias</span>
          </button>
        </nav>
      </aside>
    </div>
  );
}
