"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"

const categories = [
  "All",
  "Housekeeping",
  "Plumbing",
  "Electricians",
  "Construction",
  "Painters",
  "Cooks",
  "Carpentry",
  "Welding",
]

export default function JobCategoriesBar({ onSelect }: { onSelect: (category: string) => void }) {
  const [active, setActive] = useState("All")

  const handleClick = (category: string) => {
    setActive(category)
    onSelect(category)
  }

  return (
    <div className="flex space-x-2 overflow-x-auto pb-2">
      {categories.map(cat => (
        <Button
          key={cat}
          variant={active === cat ? "default" : "outline"}
          onClick={() => handleClick(cat)}
          className="whitespace-nowrap"
        >
          {cat}
        </Button>
      ))}
    </div>
  )
}
