"use client"

import Script from "next/script"

const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""
const sheetId = process.env.NEXT_PUBLIC_SHEET_ID || ""

export function ZadScripts() {
  return (
    <>
      <Script
        id="zad-config"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `window.__ZAD_CONFIG={clientId:${JSON.stringify(clientId)},sheetId:${JSON.stringify(sheetId)}};`,
        }}
      />
      <Script src="/zad-app.js?v=20260328s" strategy="afterInteractive" />
    </>
  )
}
