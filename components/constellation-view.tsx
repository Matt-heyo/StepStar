"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Plus, CheckCircle2 } from "lucide-react"
import StepCard from "./step-card"
import type { Goal } from "@/types"

interface ConstellationViewProps {
  goal: Goal
  onBack: () => void
  onSelectStep: (goalId: string, stepId: string) => void
  onUpdateGoal: (goal: Goal) => void
}

export default function ConstellationView({ goal, onBack, onSelectStep, onUpdateGoal }: ConstellationViewProps) {
  const [isAddingStep, setIsAddingStep] = useState(false)
  const [newStepTitle, setNewStepTitle] = useState("")

  const handleAddStep = () => {
    if (!newStepTitle.trim()) return

    const newStep = {
      id: Date.now().toString(),
      title: newStepTitle,
      description: "",
      category: "practice" as const,
      completed: false,
      order: Math.max(...goal.steps.map((s) => s.order), 0) + 1,
    }

    onUpdateGoal({
      ...goal,
      steps: [...goal.steps, newStep],
    })

    setNewStepTitle("")
    setIsAddingStep(false)
  }

  const completedSteps = goal.steps.filter((s) => s.completed)
  const progress = Math.round((completedSteps.length / goal.steps.length) * 100) || 0

  const handleMarkComplete = () => {
    if (completedSteps.length === goal.steps.length && goal.steps.length > 0) {
      onUpdateGoal({
        ...goal,
        completed: true,
      })
    }
  }

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
        <div className="flex items-start justify-between mb-2">
          <div>
            <h1 className="text-4xl font-light mb-2" style={{ color: goal.color }}>
              {goal.name}
            </h1>
            <p className="text-slate-400 mb-6">{goal.why}</p>
          </div>
          {goal.completed && <div className="text-sm text-green-400 font-medium">✨ Complete</div>}
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-slate-400">Progress</span>
            <span className="text-sm font-medium" style={{ color: goal.color }}>
              {completedSteps.length}/{goal.steps.length} completed
            </span>
          </div>
          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full transition-all duration-500"
              style={{ width: `${progress}%`, backgroundColor: goal.color }}
            />
          </div>
        </div>

        <h2 className="text-xl font-light text-slate-300 mb-4">Your Stars</h2>
        <div className="space-y-3 mb-6">
          {goal.steps.map((step) => (
            <StepCard key={step.id} step={step} goalColor={goal.color} onClick={() => onSelectStep(goal.id, step.id)} />
          ))}
        </div>

        {isAddingStep ? (
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 mb-4">
            <input
              type="text"
              placeholder="New step title..."
              value={newStepTitle}
              onChange={(e) => setNewStepTitle(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddStep()}
              autoFocus
              className="w-full bg-slate-900 text-slate-100 placeholder-slate-500 border-0 outline-none mb-3"
            />
            <div className="flex gap-2">
              <Button onClick={handleAddStep} size="sm" className="bg-slate-700 hover:bg-slate-600">
                Add
              </Button>
              <Button onClick={() => setIsAddingStep(false)} size="sm" variant="ghost" className="text-slate-400">
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <Button
            onClick={() => setIsAddingStep(true)}
            variant="outline"
            className="w-full border-slate-700 text-slate-400 hover:bg-slate-800 mb-4"
          >
            <Plus size={16} className="mr-2" />
            Add Step
          </Button>
        )}

        {completedSteps.length === goal.steps.length && goal.steps.length > 0 && !goal.completed && (
          <Button onClick={handleMarkComplete} className="w-full bg-green-600 hover:bg-green-700 gap-2">
            <CheckCircle2 size={16} />
            Mark Constellation Complete
          </Button>
        )}
      </div>
    </div>
  )
}
