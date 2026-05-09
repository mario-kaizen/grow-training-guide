import type { Metadata } from "next"
import { Sidebar } from "@/components/Sidebar"
import { SearchModal } from "@/components/SearchModal"
import "./globals.css"

export const metadata: Metadata = {
  title: "Grow Training Guide | STRONG Pilates",
  description:
    "The complete guide to managing STRONG Pilates locations through Grow.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#FAF8F5] text-gray-900 antialiased">
        <Sidebar />
        <SearchModal />
        <main className="ml-72 min-h-screen px-12 py-14">{children}</main>
      </body>
    </html>
  )
}
