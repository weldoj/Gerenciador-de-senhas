import { Card } from "~/components/ui/card"

interface CategoryCardProps {
  name: string
}

export function CategoryCard({ name }: CategoryCardProps) {
  return (
    <Card className="bg-gray-500/50 p-8 rounded-lg w-full h-[200px] flex items-center justify-center cursor-pointer hover:bg-gray-500/60 transition-colors">
      <p className="text-white text-xl font-medium">{name}</p>
    </Card>
  )
}

