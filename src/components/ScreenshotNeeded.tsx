interface ScreenshotNeededProps {
  id: string
  description: string
}

export function ScreenshotNeeded({ id, description }: ScreenshotNeededProps) {
  return (
    <figure className="my-8 not-prose">
      <div className="rounded border-2 border-dashed border-[#98C8EB]/50 bg-[#98C8EB]/5 p-8 flex flex-col items-center justify-center min-h-[200px] gap-3">
        <div className="text-[#98C8EB] text-sm font-semibold uppercase tracking-wider">
          Screenshot Needed
        </div>
        <div className="text-sm text-gray-500 text-center max-w-md leading-relaxed">
          {description}
        </div>
        <div className="text-xs text-gray-400 font-mono mt-1">
          {id}
        </div>
      </div>
    </figure>
  )
}
