export interface Step {
  id: string
  title: string
  description: string
  category: "learning" | "practice" | "wellness" | "writing" | "feedback"
  completed: boolean
  order: number
}

export interface Goal {
  id: string
  name: string
  why: string
  color: string
  shape: "circle" | "spiral" | "line" | "triangle" | "diamond"
  completed: boolean
  steps: Step[]
  createdAt: string
}

export interface Reflection {
  id: string
  goalId: string
  stepId: string
  text: string
  mood: string
  timestamp: string
}
