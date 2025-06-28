"use client"

import { useEffect, useState } from "react"
import JobCategoriesBar from "./components/jobCategories"
import KaamgarPortfolioCard from "./components/kaamgarPortfolioCard"

export default function UserDashboardPage() {
  const [category, setCategory] = useState("All")
  const [kaamgars, setKaamgars] = useState<any[]>([])

  useEffect(() => {
    const fetchKaamgars = async () => {
      const res = await fetch("https://randomuser.me/api/?results=12")
      const data = await res.json()
      const mapped = data.results.map((user: any) => ({
        id: user.login.uuid,
        name: `${user.name.first} ${user.name.last}`,
        photo: user.picture.large,
        skill: ["Electrician", "Plumber", "Cook", "Painter", "Housekeeping"][Math.floor(Math.random() * 5)],
        available: Math.random() > 0.3,
      }))
      setKaamgars(mapped)
    }

    fetchKaamgars()
  }, [])

  const filteredKaamgars =
    category === "All"
      ? kaamgars
      : kaamgars.filter((kg) => kg.skill.toLowerCase() === category.toLowerCase())

  return (
    <div className="p-6 space-y-6">
      <JobCategoriesBar onSelect={setCategory} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredKaamgars.map((kg) => (
          <KaamgarPortfolioCard key={kg.id} kaamgar={kg} />
        ))}
      </div>
    </div>
  )
}
