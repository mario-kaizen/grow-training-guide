interface ConnectionNode {
  id: string
  label: string
  type: "source" | "workflow" | "outcome" | "handoff"
  description?: string
}

interface ConnectionLine {
  from: string
  to: string
  label?: string
}

interface ConnectionDiagramProps {
  nodes: ConnectionNode[]
  connections: ConnectionLine[]
}

const nodeStyles: Record<ConnectionNode["type"], { border: string; bg: string; text: string; label: string }> = {
  source: { border: "border-sky-200", bg: "bg-sky-50", text: "text-sky-900", label: "text-sky-700" },
  workflow: { border: "border-gray-200", bg: "bg-white", text: "text-gray-900", label: "text-gray-500" },
  outcome: { border: "border-green-200", bg: "bg-green-50", text: "text-green-800", label: "text-green-600" },
  handoff: { border: "border-amber-200", bg: "bg-amber-50", text: "text-amber-800", label: "text-amber-600" },
}

const typeLabels: Record<ConnectionNode["type"], string> = {
  source: "Source",
  workflow: "Workflow",
  outcome: "Outcome",
  handoff: "Hands off to",
}

function buildRows(nodes: ConnectionNode[], connections: ConnectionLine[]): ConnectionNode[][] {
  const targetIds = new Set(connections.map((c) => c.to))
  const placed = new Set<string>()
  const rows: ConnectionNode[][] = []

  // First row: nodes with no incoming connections
  const firstRow = nodes.filter((n) => !targetIds.has(n.id))
  rows.push(firstRow)
  firstRow.forEach((n) => placed.add(n.id))

  // Subsequent rows: nodes whose sources are all placed
  let safety = 0
  while (placed.size < nodes.length && safety < 20) {
    const nextRow = nodes.filter(
      (n) =>
        !placed.has(n.id) &&
        connections
          .filter((c) => c.to === n.id)
          .every((c) => placed.has(c.from))
    )
    if (nextRow.length === 0) {
      // Place remaining nodes
      const remaining = nodes.filter((n) => !placed.has(n.id))
      if (remaining.length > 0) rows.push(remaining)
      break
    }
    rows.push(nextRow)
    nextRow.forEach((n) => placed.add(n.id))
    safety++
  }

  return rows
}

export function ConnectionDiagram({ nodes, connections }: ConnectionDiagramProps) {
  const rows = buildRows(nodes, connections)

  return (
    <div className="my-8 rounded-xl border border-gray-200 bg-[#FAF8F5] p-6 not-prose">
      {rows.map((row, ri) => (
        <div key={ri}>
          {/* Connector from previous row */}
          {ri > 0 && (
            <div className="flex flex-col items-center">
              <div className="h-3 w-0.5 bg-gray-300" />
              {/* Show connection labels if there's exactly one connection into this row */}
              {(() => {
                const labelsForRow = connections
                  .filter((c) => row.some((n) => n.id === c.to) && c.label)
                  .map((c) => c.label!)
                const uniqueLabels = [...new Set(labelsForRow)]
                if (uniqueLabels.length === 1) {
                  return (
                    <>
                      <span className="rounded-full bg-amber-50 border border-amber-200 px-3 py-0.5 text-[10px] font-medium text-amber-800">
                        {uniqueLabels[0]}
                      </span>
                      <div className="h-3 w-0.5 bg-gray-300" />
                    </>
                  )
                }
                return null
              })()}
            </div>
          )}

          {/* Row of nodes */}
          <div
            className="grid gap-3 mx-auto"
            style={{
              gridTemplateColumns: `repeat(${row.length}, minmax(0, 1fr))`,
              maxWidth: row.length === 1 ? "24rem" : row.length === 2 ? "32rem" : "42rem",
            }}
          >
            {row.map((node) => {
              const ns = nodeStyles[node.type]
              return (
                <div
                  key={node.id}
                  className={`rounded-lg border ${ns.border} ${ns.bg} px-3 py-2.5 text-center`}
                >
                  <span className={`text-[10px] font-semibold uppercase tracking-wider ${ns.label}`}>
                    {typeLabels[node.type]}
                  </span>
                  <p className={`mt-1 mb-0 text-xs font-medium ${ns.text}`}>{node.label}</p>
                  {node.description && (
                    <p className="mt-0.5 mb-0 text-[10px] text-gray-500">{node.description}</p>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
