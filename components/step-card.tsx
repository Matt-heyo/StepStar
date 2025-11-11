"use client"

import { Check, ChevronRight } from "lucide-react"
import type { Step } from "@/types"

interface StepCardProps {
  step: Step
  goalColor: string
  onClick: () => void
}

export default function StepCard({ step, goalColor, onClick }: StepCardProps) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-600 rounded-lg p-4 transition-all group"
    >
      <div className="flex items-start gap-3">
        <div className="mt-1">
          {step.completed ? (
            <div
              className="w-5 h-5 rounded-full flex items-center justify-center"
              style={{ backgroundColor: goalColor }}
            >
              <Check size={14} className="text-slate-900" />
            </div>
          ) : (
            <div className="w-5 h-5 rounded-full border-2 border-slate-600" style={{ borderColor: goalColor + "40" }} />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3
            className={`font-medium transition-colors ${step.completed ? "text-slate-400 line-through" : "text-slate-100"}`}
          >
            {step.title}
          </h3>
          {step.description && <p className="text-sm text-slate-500 mt-1">{step.description}</p>}
          <span className="inline-block mt-2 text-xs px-2 py-1 bg-slate-900 text-slate-400 rounded">
            {step.category}
          </span>
        </div>
        <ChevronRight size={18} className="text-slate-600 group-hover:text-slate-500 flex-shrink-0 mt-1" />
      </div>
    </button>
  )
}
