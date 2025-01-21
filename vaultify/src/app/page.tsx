import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Search, Plus, Settings, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import Image from "next/image";

export default function Dashboard() {
  const products = [
    {
      image: "/placeholder.svg?height=48&width=48",
      name: "LinkedIn",
      src: "https://www.linkedin.com",
    },
    {
      image: "/placeholder.svg?height=48&width=48",
      name: "X",
      src: "https://www.twitter.com",
    },
    {
      image: "/placeholder.svg?height=48&width=48",
      name: "Dropbox",
      src: "https://www.dropbox.com",
    },
    {
      image: "/placeholder.svg?height=48&width=48",
      name: "Instagram",
      src: "https://www.instagram.com",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex flex-1 items-center gap-4">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ftrsUr8XZjTaPKeLTj5zXdiSKiEkER.png"
              alt="Vaultify Logo"
              className="h-8 w-8"
            />
            <h1 className="text-xl font-semibold text-gray-700">Vaultify</h1>
            <div className="max-w-md flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Pesquisar..."
                  className="w-full bg-gray-50 pl-8"
                />
              </div>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              {/* <Button variant="ghost" size="icon" className="rounded-full" asChild>
                <button>
                  <div className="h-8 w-8 rounded-full bg-yellow-400 flex items-center justify-center text-yellow-700">
                    M
                  </div>
                </button>
              </Button> */}
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Configurações
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="min-h-[calc(100vh-64px)] w-64 border-r bg-white p-4">
          <nav className="space-y-2">
            <Button variant="ghost" className="w-full justify-start" asChild>
              <button>Senhas</button>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <button>Categorias</button>
            </Button>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((value, index) => (
              <div
                key={index}
                className="rounded-lg border bg-white p-4 transition-shadow hover:shadow-md"
              >
                <Image
                  width={30}
                  height={30}
                  src={value.image}
                  alt={value.name}
                  className="mb-2 h-12 w-12"
                />
                <p className="text-sm font-medium text-gray-600">
                  {value.name}
                </p>
                <a
                  href={value.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-500 hover:underline"
                ></a>
              </div>
            ))}

            {/* Add New Card */}
            <Button
              variant="outline"
              className="flex h-[104px] flex-col items-center justify-center gap-2 border-dashed"
              asChild
            >
              <button>
                <Plus className="h-6 w-6" />
                <span className="text-sm">Adicionar novo</span>
              </button>
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
}
