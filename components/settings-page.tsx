"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, Trash2, Download } from "lucide-react"
import { useState } from "react"

interface SettingsPageProps {
  onBack: () => void
  onReset: () => void
}

export default function SettingsPage({ onBack, onReset }: SettingsPageProps) {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [showResetConfirm, setShowResetConfirm] = useState(false)

  const handleExport = () => {
    const data = {
      goals: localStorage.getItem("stepstar_goals"),
      reflections: localStorage.getItem("stepstar_reflections"),
      exportedAt: new Date().toISOString(),
    }
    const dataStr = JSON.stringify(data, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = `stepstar-export-${new Date().toISOString().split("T")[0]}.json`
    link.click()
  }

  const handleReset = () => {
    onReset()
    setShowResetConfirm(false)
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
        <h1 className="text-4xl font-light mb-8">Settings</h1>

        <div className="space-y-4 mb-8">
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
            <h3 className="text-slate-100 font-medium mb-3">Theme</h3>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={isDarkMode}
                onChange={(e) => setIsDarkMode(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-slate-300">Dark Mode</span>
            </label>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
            <h3 className="text-slate-100 font-medium mb-3">Data</h3>
            <Button
              onClick={handleExport}
              variant="outline"
              size="sm"
              className="border-slate-600 text-slate-300 hover:bg-slate-700 w-full justify-start mb-2 bg-transparent"
            >
              <Download size={14} className="mr-2" />
              Export Data
            </Button>
            <p className="text-xs text-slate-500">Download all goals and reflections as JSON</p>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
            <h3 className="text-slate-100 font-medium mb-3">Danger Zone</h3>
            {showResetConfirm ? (
              <div className="bg-slate-900 border border-red-900 rounded p-3 mb-3">
                <p className="text-sm text-slate-300 mb-3">
                  This will delete all goals and reflections. This action cannot be undone.
                </p>
                <div className="flex gap-2">
                  <Button onClick={handleReset} size="sm" className="bg-red-900 hover:bg-red-800">
                    Confirm Reset
                  </Button>
                  <Button
                    onClick={() => setShowResetConfirm(false)}
                    size="sm"
                    variant="outline"
                    className="border-slate-600 text-slate-300"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <Button
                onClick={() => setShowResetConfirm(true)}
                variant="outline"
                size="sm"
                className="border-red-900 text-red-400 hover:bg-red-900/20 w-full justify-start"
              >
                <Trash2 size={14} className="mr-2" />
                Reset All Data
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
