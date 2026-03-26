"use client"

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react"
import type { UserProfile } from "@/lib/types"
import { OAUTH_SCOPES } from "@/lib/constants"

interface AuthState {
  accessToken: string | null
  user: UserProfile | null
  isSignedIn: boolean
  isLoading: boolean
  signIn: () => void
  signOut: () => void
}

const AuthContext = createContext<AuthState>({
  accessToken: null,
  user: null,
  isSignedIn: false,
  isLoading: true,
  signIn: () => {},
  signOut: () => {},
})

export function useAuth() {
  return useContext(AuthContext)
}

const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? ""

export function AuthProvider({ children }: { children: ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [user, setUser] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load GIS script
  useEffect(() => {
    if (!CLIENT_ID) {
      setIsLoading(false)
      return
    }

    const script = document.createElement("script")
    script.src = "https://accounts.google.com/gsi/client"
    script.async = true
    script.defer = true
    script.onload = () => {
      setIsLoading(false)
    }
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [])

  const signIn = useCallback(() => {
    if (!CLIENT_ID) {
      console.warn("No NEXT_PUBLIC_GOOGLE_CLIENT_ID set")
      return
    }

    const google = (window as unknown as { google: { accounts: { oauth2: { initTokenClient: (config: { client_id: string; scope: string; callback: (response: { access_token?: string; error?: string }) => void }) => { requestAccessToken: () => void } } } } }).google
    if (!google) return

    const client = google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: OAUTH_SCOPES.join(" "),
      callback: async (response: { access_token?: string; error?: string }) => {
        if (response.error || !response.access_token) return
        setAccessToken(response.access_token)

        // Fetch user profile
        try {
          const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
            headers: { Authorization: `Bearer ${response.access_token}` },
          })
          if (res.ok) {
            const profile = await res.json()
            setUser({
              name: profile.name,
              email: profile.email,
              picture: profile.picture,
            })
          }
        } catch {
          // Silently fail profile fetch
        }
      },
    })

    client.requestAccessToken()
  }, [])

  const signOut = useCallback(() => {
    if (accessToken) {
      const google = (window as unknown as { google: { accounts: { oauth2: { revoke: (token: string, callback: () => void) => void } } } }).google
      if (google) {
        google.accounts.oauth2.revoke(accessToken, () => {})
      }
    }
    setAccessToken(null)
    setUser(null)
  }, [accessToken])

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        user,
        isSignedIn: !!accessToken,
        isLoading,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
