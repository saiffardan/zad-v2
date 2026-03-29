"use client"

import Script from "next/script"

const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""
const sheetId = process.env.NEXT_PUBLIC_SHEET_ID || ""
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

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
          __html: `window.__ZAD_CONFIG={clientId:${JSON.stringify(clientId)},sheetId:${JSON.stringify(sheetId)},supabaseUrl:${JSON.stringify(supabaseUrl)},supabaseAnonKey:${JSON.stringify(supabaseAnonKey)}};`,
        }}
      />
      <Script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js" strategy="beforeInteractive" />
      <Script src="/zad-app.js?v=20260329av" strategy="afterInteractive" />
    </>
  )
}
