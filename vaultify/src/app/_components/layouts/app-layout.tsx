"use client"

import { useState, type ReactNode } from "react"
import { Header } from "../header"
import { Sidebar } from "../sidebar"

interface AppLayoutProps {
  children: ReactNode
  activeItem?: "passwords" | "categories"
}

export function AppLayout({ children, activeItem }: AppLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className="min-h-screen bg-[#2F2D35]">
      <Header toggleSidebar={toggleSidebar} />
      <div className="flex">
        <Sidebar isOpen={isSidebarOpen} activeItem={activeItem} />
        <main className={`flex-1 p-8 transition-all duration-300 ${isSidebarOpen ? "ml-[200px]" : "ml-0"}`}>
          {children}
        </main>
      </div>
    </div>
  )
}

