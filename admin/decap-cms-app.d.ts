declare module 'decap-cms-app' {
  interface DecapCms {
    init: (config?: unknown) => void
    registerPreviewTemplate: (name: string, component: unknown) => void
    registerPreviewStyle: (style: string, options?: { raw?: boolean }) => void
  }

  const CMS: DecapCms
  export default CMS
}
