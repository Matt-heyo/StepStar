"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import type { Goal } from "@/types"

interface CreateConstellationModalProps {
  onCreate: (goal: Goal) => void
  onClose: () => void
}

const colors = [
  { name: "Blue", value: "#60a5fa" },
  { name: "Gold", value: "#f59e0b" },
  { name: "Pink", value: "#ec4899" },
  { name: "Green", value: "#10b981" },
  { name: "Purple", value: "#a78bfa" },
  { name: "Cyan", value: "#06b6d4" },
]

const shapes = [
  { id: "circle", label: "Circle", description: "Stars arranged in a circle" },
  { id: "spiral", label: "Spiral", description: "Stars spiraling outward" },
  { id: "line", label: "Line", description: "Stars in a straight line" },
  { id: "triangle", label: "Triangle", description: "Stars forming a triangle" },
  { id: "diamond", label: "Diamond", description: "Stars forming a diamond" },
]

export default function CreateConstellationModal({ onCreate, onClose }: CreateConstellationModalProps) {
  const [name, setName] = useState("")
  const [why, setWhy] = useState("")
  const [color, setColor] = useState(colors[0].value)
  const [shape, setShape] = useState<"circle" | "spiral" | "line" | "triangle" | "diamond">("circle")

  const handleCreate = () => {
    if (!name.trim()) return

    const newGoal: Goal = {
      id: Date.now().toString(),
      name: name.trim(),
      why: why.trim(),
      color,
      shape,
      completed: false,
      steps: [],
      createdAt: new Date().toISOString(),
    }

    onCreate(newGoal)
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-lg max-w-md w-full max-h-screen overflow-y-auto">
        <div className="sticky top-0 bg-slate-900 border-b border-slate-700 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-light text-slate-100">New Constellation</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-300">
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Name Input */}
          <div>
            <label className="block text-sm text-slate-300 mb-2">Goal Name</label>
            <input
              type="text"
              placeholder="What do you want to achieve?"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCreate()}
              className="w-full bg-slate-800 text-slate-100 placeholder-slate-500 border border-slate-700 rounded-lg px-4 py-3 outline-none focus:border-slate-500 transition-colors"
            />
          </div>

          {/* Why Input */}
          <div>
            <label className="block text-sm text-slate-300 mb-2">Why does this matter?</label>
            <textarea
              placeholder="Your motivation..."
              value={why}
              onChange={(e) => setWhy(e.target.value)}
              rows={2}
              className="w-full bg-slate-800 text-slate-100 placeholder-slate-500 border border-slate-700 rounded-lg px-4 py-3 outline-none focus:border-slate-500 transition-colors resize-none"
            />
          </div>

          {/* Color Selection */}
          <div>
            <label className="block text-sm text-slate-300 mb-3">Star Color</label>
            <div className="grid grid-cols-6 gap-2">
              {colors.map((c) => (
                <button
                  key={c.value}
                  onClick={() => setColor(c.value)}
                  className={`w-10 h-10 rounded-lg transition-all ${
                    color === c.value ? "ring-2 ring-offset-2 ring-offset-slate-900" : "hover:opacity-80"
                  }`}
                  style={{ backgroundColor: c.value }}
                  title={c.name}
                />
              ))}
            </div>
          </div>

          {/* Shape Selection */}
          <div>
            <label className="block text-sm text-slate-300 mb-3">Constellation Shape</label>
            <div className="space-y-2">
              {shapes.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setShape(s.id as typeof shape)}
                  className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all ${
                    shape === s.id
                      ? "border-slate-300 bg-slate-800"
                      : "border-slate-700 bg-slate-900 hover:border-slate-600"
                  }`}
                >
                  <div className="font-medium text-slate-100">{s.label}</div>
                  <div className="text-xs text-slate-400">{s.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button onClick={handleCreate} className="flex-1 bg-blue-600 hover:bg-blue-700">
              Create Constellation
            </Button>
            <Button onClick={onClose} variant="ghost" className="flex-1 text-slate-400">
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
