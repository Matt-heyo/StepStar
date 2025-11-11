"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Filter } from "lucide-react"
import type { Goal, Reflection } from "@/types"

interface ReflectionJournalProps {
  reflections: Reflection[]
  goals: Goal[]
  onBack: () => void
}

export default function ReflectionJournal({ reflections, goals, onBack }: ReflectionJournalProps) {
  const [selectedGoalFilter, setSelectedGoalFilter] = useState<string | null>(null)

  const filteredReflections = selectedGoalFilter
    ? reflections.filter((r) => r.goalId === selectedGoalFilter)
    : reflections

  const sortedReflections = [...filteredReflections].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
  )

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
        <h1 className="text-4xl font-light mb-6">Reflection Journal</h1>

        <div className="mb-6 flex flex-wrap gap-2">
          <Button
            onClick={() => setSelectedGoalFilter(null)}
            variant={selectedGoalFilter === null ? "default" : "outline"}
            size="sm"
            className={selectedGoalFilter === null ? "bg-slate-700" : "border-slate-700 text-slate-400"}
          >
            <Filter size={14} className="mr-1" />
            All
          </Button>
          {goals.map((goal) => (
            <Button
              key={goal.id}
              onClick={() => setSelectedGoalFilter(goal.id)}
              variant={selectedGoalFilter === goal.id ? "default" : "outline"}
              size="sm"
              className={selectedGoalFilter === goal.id ? "bg-slate-700" : "border-slate-700 text-slate-400"}
            >
              {goal.name}
            </Button>
          ))}
        </div>

        {sortedReflections.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-500">No reflections yet. Complete a step to add one.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {sortedReflections.map((reflection) => {
              const goal = goals.find((g) => g.id === reflection.goalId)
              return (
                <div key={reflection.id} className="bg-slate-800 border border-slate-700 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium text-slate-100">{goal?.name}</h3>
                    <span className="text-xs text-slate-500">
                      {new Date(reflection.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-slate-300 text-sm mb-2">{reflection.text}</p>
                  <span className="inline-block text-xs px-2 py-1 bg-slate-900 text-slate-400 rounded">
                    {reflection.mood}
                  </span>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
