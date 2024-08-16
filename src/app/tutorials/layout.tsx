import { Navigation } from "@/components/layout/navigation"
import { Toaster } from "@/components/ui/toaster"
import { ReactNode } from "react"

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="h-screen flex flex-col">
        <Navigation inline />
        {children}
      </div>
      <Toaster />
    </>
  )
}
