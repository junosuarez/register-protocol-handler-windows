var scheme = /^[a-zA-Z][a-zA-Z0-9\+\-\.]*$/ // http://tools.ietf.org/html/rfc3986 Appendix A

function registerProtocolHandlerWindows (protocol, path, name) {
  if (typeof protocol !== 'string' || !scheme.test(protocol)) {
    throw new Error('required parameter `protocol` must be a valid uri scheme')
  }
  if (typeof path !== 'string' || !path) {
    throw new Error('missing required parameter `path`')
  }
  if (typeof name !== 'string' ||  !name) {
    throw new Error('missing required parameter `name`')
  }

  throw new Error('not implemented')
}

module.exports = registerProtocolHandlerWindows