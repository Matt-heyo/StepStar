"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Mic, Send } from "lucide-react"
import type { Goal, Step, Reflection } from "@/types"

interface StarStepPageProps {
  goal: Goal
  step: Step
  onBack: () => void
  onComplete: (reflection: Reflection) => void
  onUpdateGoal: (goal: Goal) => void
}

export default function StarStepPage({ goal, step, onBack, onComplete, onUpdateGoal }: StarStepPageProps) {
  const [isCompleting, setIsCompleting] = useState(false)
  const [reflection, setReflection] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)

  const handleCompleteStep = () => {
    if (step.completed) return

    const updatedGoal = {
      ...goal,
      steps: goal.steps.map((s) => (s.id === step.id ? { ...s, completed: true } : s)),
    }

    onUpdateGoal(updatedGoal)
    setIsCompleting(true)
  }

  const handleSaveReflection = () => {
    onComplete({
      id: Date.now().toString(),
      goalId: goal.id,
      stepId: step.id,
      text: reflection,
      mood: "neutral",
      timestamp: new Date().toISOString(),
    })

    setTimeout(() => {
      onBack()
    }, 500)
  }

  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder

      mediaRecorder.ondataavailable = (event) => {
        const audioUrl = URL.createObjectURL(event.data)
        console.log("Audio recorded:", audioUrl)
      }

      mediaRecorder.start()
      setIsRecording(true)
    } catch (error) {
      console.error("Recording failed:", error)
    }
  }

  const handleStopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }

  if (isCompleting) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 pb-24">
        <div className="text-center">
          <div className="mb-6 animate-pulse">
            <div
              className="w-24 h-24 rounded-full mx-auto flex items-center justify-center text-4xl"
              style={{ backgroundColor: goal.color + "20", borderColor: goal.color, borderWidth: "2px" }}
            >
              ✨
            </div>
          </div>
          <h1 className="text-3xl font-light mb-2" style={{ color: goal.color }}>
            Star Ignited!
          </h1>
          <p className="text-slate-400 mb-8">Great work completing this step.</p>

          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 max-w-md mb-6">
            <label className="block text-sm text-slate-300 mb-3">Reflect on your progress (optional)</label>
            <textarea
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              placeholder="What did you learn or feel?"
              className="w-full bg-slate-900 text-slate-100 placeholder-slate-500 rounded px-3 py-2 text-sm border border-slate-700 focus:border-slate-600 outline-none resize-none"
              rows={3}
            />

            <div className="mt-4 flex gap-2">
              <Button
                onClick={handleStartRecording}
                disabled={isRecording}
                size="sm"
                variant="outline"
                className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
              >
                <Mic size={14} className="mr-1" />
                {isRecording ? "Recording..." : "Voice Note"}
              </Button>
              {isRecording && (
                <Button onClick={handleStopRecording} size="sm" className="bg-red-900 hover:bg-red-800">
                  Stop
                </Button>
              )}
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={() => setIsCompleting(false)}
              variant="outline"
              className="border-slate-600 text-slate-300 hover:bg-slate-800"
            >
              Continue
            </Button>
            <Button onClick={handleSaveReflection} className="bg-slate-700 hover:bg-slate-600">
              <Send size={14} className="mr-2" />
              Save & Return
            </Button>
          </div>
        </div>
      </div>
    )
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
        <h1 className="text-4xl font-light mb-2" style={{ color: goal.color }}>
          {step.title}
        </h1>
        <p className="text-slate-500 mb-6">Part of "{goal.name}"</p>

        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 mb-6">
          <h2 className="text-lg font-medium text-slate-100 mb-3">About this step</h2>
          <p className="text-slate-300">{step.description || "No description provided."}</p>
          <div className="mt-4 flex gap-2">
            <span className="text-xs px-3 py-1 bg-slate-900 text-slate-400 rounded">{step.category}</span>
            {step.completed && (
              <span className="text-xs px-3 py-1 bg-emerald-900 text-emerald-300 rounded">Completed</span>
            )}
          </div>
        </div>

        {!step.completed && (
          <Button onClick={handleCompleteStep} className="w-full py-6 text-lg" style={{ backgroundColor: goal.color }}>
            Mark as Complete
          </Button>
        )}
      </div>
    </div>
  )
}
