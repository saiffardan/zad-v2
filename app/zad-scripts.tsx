"use client"

import Script from "next/script"

const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""
const sheetId = process.env.NEXT_PUBLIC_SHEET_ID || ""

export function ZadScripts() {
  return (
    <>
      <Script
        id="zad-sw-nuke"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `if('serviceWorker' in navigator){navigator.serviceWorker.getRegistrations().then(function(r){r.forEach(function(reg){reg.unregister()})});caches.keys().then(function(k){k.forEach(function(c){caches.delete(c)})})}`,
        }}
      />
      <Script
        id="zad-config"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `window.__ZAD_CONFIG={clientId:${JSON.stringify(clientId)},sheetId:${JSON.stringify(sheetId)}};`,
        }}
      />
      <Script src="/zad-app.js?v=20260329v" strategy="afterInteractive" />
    </>
  )
}
