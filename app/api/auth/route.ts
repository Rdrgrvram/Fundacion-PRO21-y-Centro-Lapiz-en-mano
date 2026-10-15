import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

export const runtime = 'nodejs'

const GITHUB_AUTHORIZE_URL = 'https://github.com/login/oauth/authorize'
const STATE_COOKIE = 'decap_oauth_state'

// Paso 1 del login de Decap CMS: redirige a GitHub para que el admin autorice la app.
// El intercambio real del código por un token ocurre en /api/auth/callback.
export async function GET(req: NextRequest) {
  const clientId = process.env.GITHUB_CLIENT_ID
  if (!clientId) {
    return new NextResponse(
      'Falta configurar GITHUB_CLIENT_ID en las variables de entorno del proyecto.',
      { status: 500 }
    )
  }

  const state = crypto.randomBytes(16).toString('hex')
  const redirectUri = `${req.nextUrl.origin}/api/auth/callback`

  const authorizeUrl = new URL(GITHUB_AUTHORIZE_URL)
  authorizeUrl.searchParams.set('client_id', clientId)
  authorizeUrl.searchParams.set('redirect_uri', redirectUri)
  authorizeUrl.searchParams.set('scope', 'repo')
  authorizeUrl.searchParams.set('state', state)

  const res = NextResponse.redirect(authorizeUrl)
  res.cookies.set(STATE_COOKIE, state, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 300,
    path: '/api/auth',
  })
  return res
}
