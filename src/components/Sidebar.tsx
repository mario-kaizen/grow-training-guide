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
      <div className="px-4 pt-4 pb-3">
        <button
          onClick={() => document.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true }))}
          className="flex items-center gap-2 w-full px-3 py-2 rounded border border-[#1e1e1e] bg-[#111] text-zinc-500 text-[13px] hover:border-zinc-600 hover:text-zinc-400 transition-colors cursor-pointer"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <span className="flex-1 text-left">Search...</span>
          <kbd className="text-[10px] text-zinc-600 bg-[#1a1a1a] px-1.5 py-0.5 rounded border border-[#2a2a2a]">⌘K</kbd>
        </button>
      </div>
      <nav className="p-4 pt-0 pb-20">
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
