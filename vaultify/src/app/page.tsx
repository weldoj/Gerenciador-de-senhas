"use client"

import { Plus } from "lucide-react"
import { Button } from "~/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "~/components/ui/tooltip"
import { PasswordCard } from "./_components/password-cards"
import { AppLayout } from "./_components/layouts/app-layout"

export default function Home() {
  const passwords = [
    {
      name: "Linkedin",
      logo: "/linkedin.avif",
    },
    {
      name: "X",
      logo: "/twitter.webp",
    },
    {
      name: "Netflix",
      logo: "/netflix.png",
    },
  ]
  return (
    <TooltipProvider>
      <AppLayout activeItem="passwords">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {passwords.map((password) => (
            <PasswordCard key={password.name} name={password.name} logo={password.logo} />
          ))}
        </div>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="fixed bottom-8 right-8 rounded-full w-12 h-12 p-0 bg-white hover:bg-gray-100 text-black"
              size="icon"
            >
              <Plus className="w-6 h-6" />
              <span className="sr-only">Adicionar senha</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Adicionar nova senha</p>
          </TooltipContent>
        </Tooltip>
      </AppLayout>
    </TooltipProvider>
  )
}

