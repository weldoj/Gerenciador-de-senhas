"use client"

import { Plus } from "lucide-react"
import { Button } from "~/components/ui/button"
import { AppLayout } from "~/app/_components/layouts/app-layout"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "~/components/ui/tooltip"
import { CategoryCard } from "../_components/categoru-card"

const categories = [
  {
    name: "Streaming",
  },
  {
    name: "Redes Sociais",
  },
]

export default function Categories() {
  return (
    <TooltipProvider>
      <AppLayout activeItem="categories">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.name} name={category.name} />
          ))}
        </div>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="fixed bottom-8 right-8 rounded-full w-12 h-12 p-0 bg-white hover:bg-gray-100 text-black"
              size="icon"
            >
              <Plus className="w-6 h-6" />
              <span className="sr-only">Adicionar categoria</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Adicionar nova categoria</p>
          </TooltipContent>
        </Tooltip>
      </AppLayout>
    </TooltipProvider>
  )
}

