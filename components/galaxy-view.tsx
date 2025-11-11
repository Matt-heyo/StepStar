"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import ConstellationCluster from "./constellation-cluster"
import CreateConstellationModal from "./create-constellation-modal"
import type { Goal } from "@/types"

interface GalaxyViewProps {
  goals: Goal[]
  onSelectGoal: (goalId: string) => void
  onNavigate: (page: string) => void
  onCreateGoal: (goal: Goal) => void
}

export default function GalaxyView({ goals, onSelectGoal, onNavigate, onCreateGoal }: GalaxyViewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [showCreateModal, setShowCreateModal] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Draw animated starfield background
    ctx.fillStyle = "#0f172a"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw ambient stars
    for (let i = 0; i < 100; i++) {
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      const size = Math.random() * 1.5
      const opacity = Math.random() * 0.5 + 0.3

      ctx.fillStyle = `rgba(148, 163, 184, ${opacity})`
      ctx.fillRect(x, y, size, size)
    }
  }, [])

  const activeGoals = goals.filter((g) => !g.completed)
  const completedGoals = goals.filter((g) => g.completed)

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      <div className="relative z-10 flex flex-col h-full overflow-y-auto">
        <div className="flex-shrink-0 p-6 text-center border-b border-slate-800">
          <h1 className="text-5xl font-light tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-purple-300 to-blue-300 mb-2">
            StepStar
          </h1>
          <p className="text-slate-400 text-sm tracking-widest uppercase">Your Constellation of Growth</p>
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* Active Constellations */}
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-light text-slate-300">Active Constellations</h2>
              <Button
                onClick={() => setShowCreateModal(true)}
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 gap-1"
              >
                <Plus size={16} />
                New
              </Button>
            </div>

            {activeGoals.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-slate-400 mb-4">No constellations yet. Create one to get started!</p>
                <Button onClick={() => setShowCreateModal(true)} className="bg-blue-600 hover:bg-blue-700">
                  Create Your First Constellation
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {activeGoals.map((goal) => (
                  <div key={goal.id} className="cursor-pointer" onClick={() => onSelectGoal(goal.id)}>
                    <ConstellationCluster goal={goal} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Completed Constellations */}
          {completedGoals.length > 0 && (
            <div className="px-6 pb-6 border-t border-slate-800">
              <h2 className="text-xl font-light text-slate-300 mt-6 mb-4">Completed Constellations ✨</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-24">
                {completedGoals.map((goal) => (
                  <div key={goal.id} className="cursor-pointer" onClick={() => onSelectGoal(goal.id)}>
                    <ConstellationCluster goal={goal} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Navigation Footer */}
        <div className="sticky bottom-0 bg-slate-950/80 backdrop-blur border-t border-slate-800 flex justify-center gap-3 py-4 px-4">
          <Button
            onClick={() => onNavigate("journal")}
            variant="outline"
            className="border-slate-600 text-slate-300 hover:bg-slate-800"
          >
            Journal
          </Button>
          <Button
            onClick={() => onNavigate("insights")}
            variant="outline"
            className="border-slate-600 text-slate-300 hover:bg-slate-800"
          >
            Insights
          </Button>
          <Button
            onClick={() => onNavigate("settings")}
            variant="outline"
            className="border-slate-600 text-slate-300 hover:bg-slate-800"
          >
            Settings
          </Button>
        </div>
      </div>

      {/* Create Constellation Modal */}
      {showCreateModal && (
        <CreateConstellationModal
          onCreate={(goal) => {
            onCreateGoal(goal)
            setShowCreateModal(false)
          }}
          onClose={() => setShowCreateModal(false)}
        />
      )}
    </div>
  )
}
