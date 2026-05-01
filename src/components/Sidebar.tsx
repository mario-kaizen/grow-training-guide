"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { navigation } from "@/lib/navigation"

export function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({})

  const toggleLayer = (label: string) => {
    setCollapsed((prev) => ({ ...prev, [label]: !prev[label] }))
  }

  return (
    <aside className="fixed left-0 top-0 h-screen w-72 bg-[#0a0a0a] text-white overflow-y-auto z-50 border-r border-[#1e1e1e]">
      <div className="p-6 border-b border-[#1e1e1e]">
        <Link href="/" className="block">
          <h1 className="font-[var(--font-heading)] text-lg font-bold tracking-tight uppercase">
            Grow Training Guide
          </h1>
          <p className="text-sm text-zinc-500 mt-0.5">STRONG Pilates</p>
        </Link>
      </div>
      <nav className="p-4 pb-20">
        {navigation.map((layer) => (
          <div key={layer.label} className="mb-5">
            <button
              onClick={() => toggleLayer(layer.label)}
              className="flex items-center justify-between w-full text-[11px] font-semibold uppercase tracking-wider text-zinc-600 mb-2 px-3 hover:text-zinc-400 transition-colors"
            >
              {layer.label}
              <svg
                className={`w-3.5 h-3.5 transition-transform ${collapsed[layer.label] ? "-rotate-90" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {!collapsed[layer.label] && (
              <ul className="space-y-0.5">
                {layer.items.map((item) => {
                  const isActive = pathname === item.slug
                  return (
                    <li key={item.slug}>
                      <Link
                        href={item.slug}
                        className={`block px-3 py-2 rounded text-[13px] transition-colors ${
                          isActive
                            ? "bg-[#98C8EB]/15 text-[#98C8EB] font-medium"
                            : "text-zinc-400 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        {item.title}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        ))}
      </nav>
    </aside>
  )
}
