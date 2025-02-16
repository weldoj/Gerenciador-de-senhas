"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "~/components/ui/button"

interface PasswordCardProps {
  name: string
  logo: string
}

export function PasswordCard({ name, logo }: PasswordCardProps) {
  const [isSelected, setIsSelected] = useState(false)

  return (
    <div
      className={`bg-white p-4 rounded-lg w-[200px] cursor-pointer transition-all duration-300 ${isSelected ? "ring-2 ring-blue-500" : ""}`}
      onClick={() => setIsSelected(!isSelected)}
    >
      <Image
        src={logo || "/placeholder.svg"}
        alt={`${name} logo`}
        width={150}
        height={100}
        className="w-full h-[100px] object-contain mb-4"
      />
      <p className="text-center font-medium mb-4">{name}</p>
      {isSelected && (
        <div className="flex gap-2 mt-4">
          {/* <Button variant="secondary" className="flex-1 bg-[#F5DEB3] hover:bg-[#F5DEB3]/80 text-black">
            Editar
          </Button> */}
          <Button variant="secondary" className="flex-1 bg-[#F08080] hover:bg-[#F08080]/80 text-black">
            Excluir
          </Button>
        </div>
      )}
    </div>
  )
}

