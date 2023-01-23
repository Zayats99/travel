const getMeta = (name: string) => document.querySelector(`meta[name=${encodeURIComponent(name)}]`)

export const setMaximumScaleOnIOSWebkit = () => {
  const viewport = getMeta('viewport')
  const { userAgent: ua } = window.navigator
  const iOSWebKitBrowser = /(iPad|iPhone)/i.test(ua) && /WebKit/i.test(ua) && !/OPiOS/.test(ua)

  if (iOSWebKitBrowser && viewport) {
    viewport.setAttribute(
      'content',
      `${viewport.getAttribute('content')}, maximum-scale=1` // https://developer.mozilla.org/en-US/docs/Mozilla/Mobile/Viewport_meta_tag
    )
  }
}
