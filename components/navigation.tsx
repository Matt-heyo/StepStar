"use client"

import { Home, BookOpen, Lightbulb, Settings } from "lucide-react"

interface NavigationProps {
  currentPage: string
  onNavigate: (page: string) => void
}

export default function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const isVisible = ["galaxy", "journal", "insights", "settings"].includes(currentPage)

  if (!isVisible) return null

  const navItems = [
    { id: "galaxy", label: "Galaxy", icon: Home },
    { id: "journal", label: "Journal", icon: BookOpen },
    { id: "insights", label: "Insights", icon: Lightbulb },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-800 flex justify-around">
      {navItems.map((item) => {
        const Icon = item.icon
        const isActive = currentPage === item.id
        return (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`flex-1 flex flex-col items-center justify-center py-4 transition-colors ${
              isActive ? "text-blue-400 bg-slate-800/50" : "text-slate-500 hover:text-slate-400"
            }`}
          >
            <Icon size={20} />
            <span className="text-xs mt-1">{item.label}</span>
          </button>
        )
      })}
    </nav>
  )
}
