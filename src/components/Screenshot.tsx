interface ScreenshotProps {
  src: string
  alt: string
  caption?: string
}

export function Screenshot({ src, alt, caption }: ScreenshotProps) {
  return (
    <figure className="my-8 not-prose">
      <div className="rounded border border-gray-200 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className="w-full h-auto" />
      </div>
      {caption && (
        <figcaption className="mt-2.5 text-sm text-gray-500 text-center">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
