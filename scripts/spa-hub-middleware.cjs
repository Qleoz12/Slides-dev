/** live-server: serve deck index.html for /deck/5, /deck/presenter, etc. */
module.exports = function spaHubMiddleware(req, res, next) {
  const pathOnly = (req.url || '').split('?')[0].split('#')[0]
  const m = pathOnly.match(/^\/([^/]+)\/(?:\d+|presenter|overview|notes|print)(?:\/|$)/)
  if (m) {
    req.url = `/${m[1]}/index.html`
  }
  next()
}