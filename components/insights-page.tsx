"use client"
import { ChevronLeft } from "lucide-react"
import type { Goal, Reflection } from "@/types"

interface InsightsPageProps {
  goals: Goal[]
  reflections: Reflection[]
  onBack: () => void
}

export default function InsightsPage({ goals, reflections, onBack }: InsightsPageProps) {
  const totalStepsCompleted = goals.reduce((acc, goal) => acc + goal.steps.filter((s) => s.completed).length, 0)

  const totalSteps = goals.reduce((acc, goal) => acc + goal.steps.length, 0)

  const goalStats = goals.map((goal) => ({
    goal,
    completed: goal.steps.filter((s) => s.completed).length,
    total: goal.steps.length,
    percentage: Math.round((goal.steps.filter((s) => s.completed).length / goal.steps.length) * 100),
  }))

  return (
    <div className="min-h-screen p-6 pb-24">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-slate-400 hover:text-slate-300 mb-6 transition-colors"
      >
        <ChevronLeft size={20} />
        <span>Back</span>
      </button>

      <div className="max-w-2xl">
        <h1 className="text-4xl font-light mb-8">Your Insights</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <p className="text-slate-500 text-sm mb-1">Total Progress</p>
            <p className="text-3xl font-light text-blue-300">
              {totalStepsCompleted}/{totalSteps}
            </p>
            <p className="text-xs text-slate-500 mt-2">
              {Math.round((totalStepsCompleted / totalSteps) * 100)}% complete
            </p>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <p className="text-slate-500 text-sm mb-1">Total Reflections</p>
            <p className="text-3xl font-light text-purple-300">{reflections.length}</p>
            <p className="text-xs text-slate-500 mt-2">Moments of growth captured</p>
          </div>
        </div>

        <h2 className="text-xl font-light text-slate-300 mb-4">Goal Progress</h2>
        <div className="space-y-4 mb-8">
          {goalStats.map((stat) => (
            <div key={stat.goal.id} className="bg-slate-800 border border-slate-700 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-slate-100 font-medium">{stat.goal.name}</h3>
                <span className="text-sm text-slate-400">
                  {stat.completed}/{stat.total}
                </span>
              </div>
              <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                <div
                  className="h-full transition-all"
                  style={{ width: `${stat.percentage}%`, backgroundColor: stat.goal.color }}
                />
              </div>
              <p className="text-xs text-slate-500 mt-2">{stat.percentage}% complete</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-slate-800 to-slate-700 border border-slate-600 rounded-lg p-6">
          <p className="text-slate-300 italic text-center">
            "You shine brightest when you start early. Every star you light makes your constellation more radiant."
          </p>
        </div>
      </div>
    </div>
  )
}
