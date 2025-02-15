"use client"
import { Avatar, AvatarImage, AvatarFallback } from "~/components/ui/avatar";
import Image from "next/image";
import { Button } from "~/components/ui/button";

interface HeaderProps {
  toggleSidebar: () => void;
}

export function Header({ toggleSidebar }: HeaderProps) {
  return (
    <header className="flex items-center justify-between border-b border-gray-600 p-4 bg-white">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="text-white"
        >
          <Image src="/Menu.png" alt="Vaultify" width={30} height={30} />
          </Button>
        <div className="flex items-center gap-2">
        <Image src="/Bank Safe.png" alt="Vaultify" width={50} height={50} />
        <span className="text-xl text-white">Vaultify</span>
        </div>
      </div>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </header>
  );
}
