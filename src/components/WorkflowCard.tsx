"use client"

import { useState } from "react"

interface WorkflowStep {
  type: "action" | "condition" | "wait" | "link"
  label: string
  detail: string
  linkTo?: string
}

interface WorkflowCardProps {
  name: string
  purpose: string
  status: "published" | "draft"
  trigger?: string
  steps: WorkflowStep[]
  workflowUrl?: string
  settings?: {
    allowReentry?: boolean
    stopOnResponse?: boolean
  }
}

const stepTypeStyles: Record<WorkflowStep["type"], { bg: string; text: string; label: string }> = {
  action: { bg: "bg-blue-50", text: "text-blue-700", label: "Action" },
  condition: { bg: "bg-purple-50", text: "text-purple-700", label: "Check" },
  wait: { bg: "bg-gray-50", text: "text-gray-500", label: "Wait" },
  link: { bg: "bg-amber-50", text: "text-amber-700", label: "Workflow" },
}

export function WorkflowCard({ name, purpose, status, trigger, steps, workflowUrl, settings }: WorkflowCardProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border border-gray-200 rounded-lg mb-6 overflow-hidden">
      <div className="bg-white px-5 py-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h4 className="font-[family-name:var(--font-kessel)] font-black text-sm uppercase tracking-wide text-black m-0 leading-tight">
              {workflowUrl ? (
                <a
                  href={workflowUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black hover:text-[#4a90b8] transition-colors no-underline"
                >
                  {name}
                  <svg className="inline-block w-3.5 h-3.5 ml-1.5 -mt-0.5 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </a>
              ) : (
                name
              )}
            </h4>
            <p className="text-sm text-gray-600 mt-1 mb-0">{purpose}</p>
          </div>
          <span
            className={`shrink-0 text-xs font-semibold px-2 py-0.5 rounded-full ${
              status === "published"
                ? "bg-green-100 text-green-700"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            {status === "published" ? "Published" : "Draft"}
          </span>
        </div>

        {trigger && (
          <div className="mt-3 text-xs text-gray-500">
            <span className="font-semibold uppercase tracking-wider">Trigger:</span>{" "}
            <span className="text-gray-700">{trigger}</span>
          </div>
        )}

        {!trigger && (
          <div className="mt-3 text-xs text-gray-500">
            <span className="font-semibold uppercase tracking-wider">Trigger:</span>{" "}
            <span className="text-gray-400 italic">None (started by another workflow)</span>
          </div>
        )}

        <button
          onClick={() => setOpen(!open)}
          className="mt-3 text-sm font-medium text-[#4a90b8] hover:text-[#3a7a9f] flex items-center gap-1 cursor-pointer bg-transparent border-none p-0"
        >
          <svg
            className={`w-4 h-4 transition-transform ${open ? "rotate-90" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
          {open ? "Hide steps" : `Show ${steps.length} steps`}
        </button>
      </div>

      {open && (
        <div className="border-t border-gray-200 bg-gray-50/50 px-5 py-4">
          <ol className="list-none m-0 p-0 space-y-2">
            {steps.map((step, i) => {
              const style = stepTypeStyles[step.type]
              return (
                <li key={i} className="flex items-start gap-3 text-sm">
                  <span className="shrink-0 w-6 h-6 rounded-full bg-gray-200 text-gray-600 text-xs font-semibold flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  <div className="min-w-0">
                    <span className={`inline-block text-xs font-semibold px-1.5 py-0.5 rounded ${style.bg} ${style.text} mr-2`}>
                      {style.label}
                    </span>
                    <span className="font-medium text-gray-900">{step.label}</span>
                    <p className="text-gray-500 text-xs mt-0.5 mb-0">{step.detail}</p>
                    {step.linkTo && (
                      <a
                        href={step.linkTo}
                        className="text-xs text-[#4a90b8] hover:underline mt-0.5 inline-block"
                      >
                        View workflow →
                      </a>
                    )}
                  </div>
                </li>
              )
            })}
          </ol>

          {settings && (
            <div className="mt-4 pt-3 border-t border-gray-200 flex gap-4 text-xs text-gray-500">
              {settings.allowReentry !== undefined && (
                <span>
                  Allow re-entry:{" "}
                  <span className="font-medium text-gray-700">
                    {settings.allowReentry ? "Yes" : "No"}
                  </span>
                </span>
              )}
              {settings.stopOnResponse !== undefined && (
                <span>
                  Stop on response:{" "}
                  <span className="font-medium text-gray-700">
                    {settings.stopOnResponse ? "Yes" : "No"}
                  </span>
                </span>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
