import { ReactNode } from "react"

interface CalloutProps {
  type?: "tip" | "warning" | "important"
  title?: string
  children: ReactNode
}

const config = {
  tip: {
    bg: "bg-sky-50",
    border: "border-sky-200",
    title: "text-sky-800",
    text: "text-sky-900",
  },
  warning: {
    bg: "bg-amber-50",
    border: "border-amber-200",
    title: "text-amber-800",
    text: "text-amber-900",
  },
  important: {
    bg: "bg-red-50",
    border: "border-red-200",
    title: "text-red-800",
    text: "text-red-900",
  },
}

export function Callout({ type = "tip", title, children }: CalloutProps) {
  const c = config[type]
  const labels = { tip: "Tip", warning: "Warning", important: "Important" }

  return (
    <div className={`my-6 rounded border ${c.border} ${c.bg} p-5 not-prose`}>
      <p className={`text-sm font-semibold uppercase tracking-wider ${c.title} mb-2`}>
        {title || labels[type]}
      </p>
      <div className={`text-sm ${c.text} leading-relaxed`}>
        {children}
      </div>
    </div>
  )
}
