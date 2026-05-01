interface LoomEmbedProps {
  url: string
  title?: string
}

export function LoomEmbed({ url, title }: LoomEmbedProps) {
  const loomId = url.replace(/\/$/, "").split("/").pop()?.split("?")[0]

  return (
    <div className="my-8 not-prose">
      {title && (
        <p className="text-sm font-medium text-gray-500 mb-2">{title}</p>
      )}
      <div
        className="relative w-full rounded border border-gray-200 overflow-hidden"
        style={{ paddingBottom: "56.25%" }}
      >
        <iframe
          src={`https://www.loom.com/embed/${loomId}`}
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      </div>
    </div>
  )
}
