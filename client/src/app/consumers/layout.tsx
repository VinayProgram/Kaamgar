"use client"

import DailogContextProvider from "../context/dailog-context";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
      <main className="w-full">
        <DailogContextProvider>
        {children} 
        </DailogContextProvider>
      </main>
  )
}