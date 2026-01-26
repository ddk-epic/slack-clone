"use client"

import { Provider } from "jotai"

function JotaiProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider>{children}</Provider>
  )
}

export default JotaiProvider