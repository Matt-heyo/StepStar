"use client"

import { useEffect, useRef } from "react"
import type { Goal } from "@/types"

interface ConstellationClusterProps {
  goal: Goal
}

export default function ConstellationCluster({ goal }: ConstellationClusterProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = 200
    canvas.height = 200

    // Clear canvas
    ctx.fillStyle = "rgba(15, 23, 42, 0.3)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    const getStarPositions = () => {
      const positions: Array<{ x: number; y: number }> = []
      const centerX = 100
      const centerY = 100
      const steps = goal.steps.length || 1

      switch (goal.shape) {
        case "circle":
          for (let i = 0; i < steps; i++) {
            const angle = (i / steps) * Math.PI * 2
            positions.push({
              x: centerX + Math.cos(angle) * 50,
              y: centerY + Math.sin(angle) * 50,
            })
          }
          break

        case "spiral":
          for (let i = 0; i < steps; i++) {
            const angle = (i / steps) * Math.PI * 4
            const radius = (i / steps) * 50
            positions.push({
              x: centerX + Math.cos(angle) * radius,
              y: centerY + Math.sin(angle) * radius,
            })
          }
          break

        case "line":
          for (let i = 0; i < steps; i++) {
            positions.push({
              x: centerX - 40 + (i / Math.max(steps - 1, 1)) * 80,
              y: centerY,
            })
          }
          break

        case "triangle":
          for (let i = 0; i < steps; i++) {
            const angle = (i / steps) * Math.PI * 2
            const adjusted = angle + Math.PI / 2
            positions.push({
              x: centerX + Math.cos(adjusted) * 50,
              y: centerY + Math.sin(adjusted) * 50,
            })
          }
          break

        case "diamond":
          for (let i = 0; i < steps; i++) {
            const angle = (i / steps) * Math.PI * 2 + Math.PI / 4
            positions.push({
              x: centerX + Math.cos(angle) * 50,
              y: centerY + Math.sin(angle) * 50,
            })
          }
          break
      }

      return positions
    }

    const stars = getStarPositions()

    // Draw connections
    ctx.strokeStyle = `${goal.color}30`
    ctx.lineWidth = 1
    ctx.beginPath()
    stars.forEach((star, i) => {
      if (i === 0) ctx.moveTo(star.x, star.y)
      else ctx.lineTo(star.x, star.y)
    })
    if (stars.length > 0) ctx.closePath()
    ctx.stroke()

    // Draw stars
    stars.forEach((star, i) => {
      const completed = goal.steps[i]?.completed || false
      const radius = completed ? 4 : 2.5

      ctx.fillStyle = completed ? goal.color : `${goal.color}50`
      ctx.beginPath()
      ctx.arc(star.x, star.y, radius, 0, Math.PI * 2)
      ctx.fill()

      if (completed) {
        ctx.strokeStyle = goal.color
        ctx.lineWidth = 1.5
        ctx.stroke()
      }
    })

    // Draw center
    const centerX = 100
    const centerY = 100
    ctx.fillStyle = goal.color
    ctx.beginPath()
    ctx.arc(centerX, centerY, 5, 0, Math.PI * 2)
    ctx.fill()
  }, [goal])

  const completedCount = goal.steps.filter((s) => s.completed).length
  const progress = Math.round((completedCount / goal.steps.length) * 100) || 0

  return (
    <div
      className={`bg-slate-900 border rounded-lg p-4 hover:border-slate-700 transition-all group cursor-pointer ${
        goal.completed ? "border-slate-700 opacity-75" : "border-slate-800"
      }`}
    >
      <canvas ref={canvasRef} className="w-full h-40 mb-3" />
      <h3 className="text-lg font-medium text-slate-100 truncate">{goal.name}</h3>
      <p className="text-xs text-slate-500 mb-2 line-clamp-1">{goal.why}</p>
      <div className="flex items-center justify-between text-xs">
        <span className="text-slate-400">
          {completedCount}/{goal.steps.length} stars
        </span>
        <div className="w-24 h-1.5 bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full transition-all" style={{ width: `${progress}%`, backgroundColor: goal.color }} />
        </div>
      </div>
      {goal.completed && <div className="mt-2 text-center text-xs text-green-400 font-medium">✨ Complete</div>}
    </div>
  )
}
