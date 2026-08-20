import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

const GITHUB_TOKEN_URL = 'https://github.com/login/oauth/access_token'
const STATE_COOKIE = 'decap_oauth_state'

interface GitHubTokenResponse {
  access_token?: string
  error?: string
  error_description?: string
}

// Handshake que Decap CMS espera de vuelta en la ventana emergente de login:
// un postMessage con el token, en el formato "authorization:github:success:{...}".
function renderPostMessageHtml(result: { token: string } | { error: string }): string {
  const message =
    'token' in result
      ? `authorization:github:success:${JSON.stringify({ token: result.token, provider: 'github' })}`
      : `authorization:github:error:${JSON.stringify({ message: result.error })}`

  return `<!doctype html>
<html>
<body>
<script>
(function () {
  function receiveMessage(e) {
    window.opener.postMessage(${JSON.stringify(message)}, e.origin)
    window.removeEventListener('message', receiveMessage, false)
  }
  window.addEventListener('message', receiveMessage, false)
  window.opener.postMessage('authorizing:github', '*')
})()
</script>
</body>
</html>`
}

function htmlResponse(body: string, status: number) {
  return new NextResponse(body, { status, headers: { 'Content-Type': 'text/html; charset=utf-8' } })
}

// Paso 2 del login: GitHub redirige aquí con un código de un solo uso.
// Este endpoint lo cambia por un token de acceso usando el client secret
// (ese intercambio no puede hacerse en el navegador sin exponer el secreto).
export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code')
  const state = req.nextUrl.searchParams.get('state')
  const storedState = req.cookies.get(STATE_COOKIE)?.value

  const clientId = process.env.GITHUB_CLIENT_ID
  const clientSecret = process.env.GITHUB_CLIENT_SECRET

  if (!clientId || !clientSecret) {
    return htmlResponse(
      renderPostMessageHtml({ error: 'Falta configurar GITHUB_CLIENT_ID/GITHUB_CLIENT_SECRET.' }),
      500
    )
  }

  if (!code || !state || state !== storedState) {
    return htmlResponse(
      renderPostMessageHtml({ error: 'Estado inválido o código de autorización faltante.' }),
      400
    )
  }

  const tokenRes = await fetch(GITHUB_TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code,
      redirect_uri: `${req.nextUrl.origin}/api/auth/callback`,
    }),
  })
  const tokenData = (await tokenRes.json()) as GitHubTokenResponse

  if (!tokenRes.ok || tokenData.error || !tokenData.access_token) {
    return htmlResponse(
      renderPostMessageHtml({
        error: tokenData.error_description ?? 'No se pudo obtener el token de acceso de GitHub.',
      }),
      400
    )
  }

  const res = htmlResponse(renderPostMessageHtml({ token: tokenData.access_token }), 200)
  res.cookies.delete(STATE_COOKIE)
  return res
}
