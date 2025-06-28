"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function KaamgarPortfolioCard({ kaamgar }: { kaamgar: any }) {
  return (
    <Card className="w-full max-w-xs">
      <CardContent className="p-4">
        <img
          src={kaamgar.photo || "https://via.placeholder.com/150"}
          alt={kaamgar.name}
          className="w-full h-40 object-cover rounded-md mb-4"
        />
        <h3 className="text-lg font-bold">{kaamgar.name}</h3>
        <p className="text-sm text-muted-foreground">{kaamgar.skill}</p>
        <p className="text-xs text-green-600">{kaamgar.available ? "✅ Available" : "❌ Busy"}</p>
        <Button className="w-full mt-4">View Profile</Button>
      </CardContent>
    </Card>
  )
}
