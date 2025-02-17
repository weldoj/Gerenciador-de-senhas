import { KeyIcon, FolderIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface SidebarProps {
  isOpen: boolean
  activeItem?: "passwords" | "categories"
}

export function Sidebar({ isOpen, activeItem }: SidebarProps) {
  if (!isOpen) return null

  return (
    <aside className="fixed top-[64px] w-[85px] h-[calc(100vh-64px)] border-r mt-2 border-gray-600 bg-[#D9D9D9]">
      <div className="p- space-y-2 w-full">
        <Link
          href="/"
          className={`flex items-center flex-col space-x-2 w-full text-white rounded-lg ${
            activeItem === "passwords" ? "bg-white" : "hover:bg-gray-600"
          }`}
        >
          <Image src={"/Locker.png"} alt={"chave"} width={40} height={40}/>
          <span className="text-black text-sm">Minhas senhas</span>
        </Link>
        {/* <Link
          href="/categorias"
          className={`flex items-center flex-col space-x-2 p-2 text-white rounded-lg ${
            activeItem === "categories" ? "bg-white" : "hover:bg-gray-600"
          }`}
        >
          <Image src={"/Opened Folder.png"} alt={"folder"} width={20} height={20}/>
          <span className="text-black text-sm">Categories</span>
        </Link> */}
      </div>
    </aside>
  )
}

