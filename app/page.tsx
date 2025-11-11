"use client"

import { useState } from "react"
import GalaxyView from "@/components/galaxy-view"
import ConstellationView from "@/components/constellation-view"
import StarStepPage from "@/components/star-step-page"
import ReflectionJournal from "@/components/reflection-journal"
import InsightsPage from "@/components/insights-page"
import SettingsPage from "@/components/settings-page"
import Navigation from "@/components/navigation"
import { useLocalStorage } from "@/hooks/use-local-storage"
import type { Goal, Reflection } from "@/types"

type Page = "galaxy" | "constellation" | "step" | "journal" | "insights" | "settings"

export default function Home() {
  const [currentPage, setCurrentPage] = useState<Page>("galaxy")
  const [selectedGoalId, setSelectedGoalId] = useState<string | null>(null)
  const [selectedStepId, setSelectedStepId] = useState<string | null>(null)
  const [goals, setGoals] = useLocalStorage<Goal[]>("stepstar_goals", getDummyGoals())
  const [reflections, setReflections] = useLocalStorage<Reflection[]>("stepstar_reflections", [])

  const handleViewGoal = (goalId: string) => {
    setSelectedGoalId(goalId)
    setCurrentPage("constellation")
  }

  const handleViewStep = (goalId: string, stepId: string) => {
    setSelectedGoalId(goalId)
    setSelectedStepId(stepId)
    setCurrentPage("step")
  }

  const handleSaveReflection = (reflection: Reflection) => {
    setReflections([...reflections, reflection])
  }

  const handleUpdateGoal = (updatedGoal: Goal) => {
    setGoals(goals.map((g) => (g.id === updatedGoal.id ? updatedGoal : g)))
  }

  const handleCreateGoal = (newGoal: Goal) => {
    setGoals([...goals, newGoal])
  }

  const renderPage = () => {
    switch (currentPage) {
      case "galaxy":
        return (
          <GalaxyView
            goals={goals}
            onSelectGoal={handleViewGoal}
            onNavigate={(page) => setCurrentPage(page as Page)}
            onCreateGoal={handleCreateGoal}
          />
        )
      case "constellation":
        return (
          <ConstellationView
            goal={goals.find((g) => g.id === selectedGoalId)!}
            onBack={() => setCurrentPage("galaxy")}
            onSelectStep={handleViewStep}
            onUpdateGoal={handleUpdateGoal}
          />
        )
      case "step":
        return (
          <StarStepPage
            goal={goals.find((g) => g.id === selectedGoalId)!}
            step={goals.find((g) => g.id === selectedGoalId)?.steps.find((s) => s.id === selectedStepId)!}
            onBack={() => setCurrentPage("constellation")}
            onComplete={handleSaveReflection}
            onUpdateGoal={handleUpdateGoal}
          />
        )
      case "journal":
        return <ReflectionJournal reflections={reflections} goals={goals} onBack={() => setCurrentPage("galaxy")} />
      case "insights":
        return <InsightsPage goals={goals} reflections={reflections} onBack={() => setCurrentPage("galaxy")} />
      case "settings":
        return (
          <SettingsPage
            onBack={() => setCurrentPage("galaxy")}
            onReset={() => {
              setGoals(getDummyGoals())
              setReflections([])
            }}
          />
        )
      default:
        return null
    }
  }

  return (
    <main className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 min-h-screen text-slate-100">
      {renderPage()}
      <Navigation currentPage={currentPage} onNavigate={(page) => setCurrentPage(page as Page)} />
    </main>
  )
}

function getDummyGoals(): Goal[] {
  return [
    {
      id: "1",
      name: "Master React",
      why: "Build beautiful, interactive interfaces",
      color: "#60a5fa",
      shape: "circle",
      completed: false,
      steps: [
        {
          id: "s1",
          title: "Learn Hooks",
          description: "Master useState, useEffect, and custom hooks",
          category: "learning",
          completed: true,
          order: 1,
        },
        {
          id: "s2",
          title: "Build a Project",
          description: "Create a real-world project using React",
          category: "practice",
          completed: false,
          order: 2,
        },
        {
          id: "s3",
          title: "Performance Optimization",
          description: "Learn memoization and code splitting",
          category: "learning",
          completed: false,
          order: 3,
        },
      ],
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "2",
      name: "Daily Meditation",
      why: "Find peace and mental clarity",
      color: "#f59e0b",
      shape: "spiral",
      completed: false,
      steps: [
        {
          id: "s4",
          title: "Morning Sit",
          description: "10 minute meditation",
          category: "wellness",
          completed: true,
          order: 1,
        },
        {
          id: "s5",
          title: "Evening Reflection",
          description: "5 minute mindfulness",
          category: "wellness",
          completed: true,
          order: 2,
        },
        {
          id: "s6",
          title: "Breathing Exercise",
          description: "Box breathing technique",
          category: "wellness",
          completed: false,
          order: 3,
        },
      ],
      createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "3",
      name: "Write a Novel",
      why: "Share my unique perspective",
      color: "#ec4899",
      shape: "diamond",
      completed: true,
      steps: [
        {
          id: "s7",
          title: "Outline chapters",
          description: "Create story structure",
          category: "writing",
          completed: true,
          order: 1,
        },
        {
          id: "s8",
          title: "Write chapter 1",
          description: "2000 words",
          category: "writing",
          completed: false,
          order: 2,
        },
        {
          id: "s9",
          title: "Beta readers feedback",
          description: "Collect reviews",
          category: "feedback",
          completed: false,
          order: 3,
        },
      ],
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ]
}
