import Link from "next/link"
import { getAdjacentPages } from "@/lib/navigation"

interface PageLayoutProps {
  title: string
  description?: string
  slug: string
  children: React.ReactNode
}

export function PageLayout({ title, description, slug, children }: PageLayoutProps) {
  const { prev, next } = getAdjacentPages(slug)

  return (
    <div className="max-w-3xl mx-auto">
      <header className="mb-10">
        <h1 className="text-3xl font-black text-black tracking-tight uppercase sm:text-4xl">
          {title}
        </h1>
        {description && (
          <p className="mt-3 text-lg text-gray-500 leading-relaxed">
            {description}
          </p>
        )}
      </header>

      <article className="prose prose-base max-w-none prose-headings:uppercase prose-headings:tracking-tight prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:font-bold prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-p:leading-relaxed prose-li:leading-relaxed">
        {children}
      </article>

      <nav className="mt-16 pt-8 border-t border-gray-200 flex justify-between">
        {prev ? (
          <Link href={prev.slug} className="group">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
              Previous
            </span>
            <p className="text-[#4a90b8] font-medium group-hover:text-[#3a7a9e] transition-colors">
              {prev.title}
            </p>
          </Link>
        ) : (
          <div />
        )}
        {next ? (
          <Link href={next.slug} className="group text-right">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
              Next
            </span>
            <p className="text-[#4a90b8] font-medium group-hover:text-[#3a7a9e] transition-colors">
              {next.title}
            </p>
          </Link>
        ) : (
          <div />
        )}
      </nav>
    </div>
  )
}
