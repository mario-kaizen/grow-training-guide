import { ReactNode } from "react"

interface Step {
  title: string
  content: ReactNode
}

interface StepByStepProps {
  steps: Step[]
}

export function StepByStep({ steps }: StepByStepProps) {
  return (
    <div className="my-8 space-y-6 not-prose">
      {steps.map((step, i) => (
        <div key={i} className="flex gap-4">
          <div className="shrink-0 w-8 h-8 rounded bg-black text-white flex items-center justify-center text-sm font-bold">
            {i + 1}
          </div>
          <div className="pt-0.5">
            <h4 className="font-semibold text-black mb-1">{step.title}</h4>
            <div className="text-gray-600 text-[15px] leading-relaxed">
              {step.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
