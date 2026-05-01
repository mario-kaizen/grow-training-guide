import Link from "next/link"
import { navigation } from "@/lib/navigation"

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto">
      <header className="mb-14">
        <h1 className="text-4xl font-black text-black tracking-tight uppercase">
          Grow Training Guide
        </h1>
        <p className="mt-4 text-xl text-gray-500 leading-relaxed">
          Everything you need to know about managing STRONG Pilates locations
          through Grow. Start from the beginning or jump to any section.
        </p>
      </header>

      <div className="space-y-10">
        {navigation.map((layer) => (
          <section key={layer.label}>
            <h2 className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-4">
              {layer.label}
            </h2>
            <div className="grid gap-3">
              {layer.items.map((item) => (
                <Link
                  key={item.slug}
                  href={item.slug}
                  className="block p-5 rounded border border-gray-200 hover:border-[#4a90b8]/40 transition-all group"
                >
                  <h3 className="font-semibold text-black group-hover:text-[#4a90b8] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {item.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
