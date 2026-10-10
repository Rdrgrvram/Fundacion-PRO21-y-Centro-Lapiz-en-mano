// Helper server-side para leer/escribir archivos del repo vía la Contents API de
// GitHub, reusando el mismo token OAuth que ya usa Decap CMS en producción (ver
// app/admin/blog/ y app/api/admin-blog/*). Mismos repo/branch que
// public/admin/config.yml — si alguna vez cambian ahí, actualizar acá también.

const REPO = 'Rdrgrvram/Fundacion-PRO21-y-Centro-Lapiz-en-mano'
const BRANCH = 'master'

interface GithubFile {
  content: string
  sha: string
}

async function githubRequest(url: string, token: string, init?: RequestInit): Promise<Response> {
  const res = await fetch(url, {
    ...init,
    headers: {
      Authorization: `token ${token}`,
      Accept: 'application/vnd.github+json',
      ...init?.headers,
    },
  })
  if (!res.ok) {
    const body = await res.text().catch(() => '')
    throw new Error(`GitHub API ${res.status} en ${url}: ${body.slice(0, 200)}`)
  }
  return res
}

export async function listGithubDir(dirPath: string, token: string): Promise<{ name: string }[]> {
  const res = await githubRequest(`https://api.github.com/repos/${REPO}/contents/${dirPath}?ref=${BRANCH}`, token)
  return res.json()
}

export async function getGithubFile(filePath: string, token: string): Promise<GithubFile> {
  const res = await githubRequest(`https://api.github.com/repos/${REPO}/contents/${filePath}?ref=${BRANCH}`, token)
  const json = await res.json()
  return { content: Buffer.from(json.content, 'base64').toString('utf-8'), sha: json.sha }
}

export async function putGithubFile(
  filePath: string,
  content: string,
  sha: string,
  token: string,
  message: string
): Promise<void> {
  await githubRequest(`https://api.github.com/repos/${REPO}/contents/${filePath}`, token, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message,
      content: Buffer.from(content, 'utf-8').toString('base64'),
      sha,
      branch: BRANCH,
    }),
  })
}
