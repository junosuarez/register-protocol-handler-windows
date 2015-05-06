var registry = require('newt')(require('winreg'))
var scheme = /^[a-zA-Z][a-zA-Z0-9\+\-\.]*$/ // http://tools.ietf.org/html/rfc3986 Appendix A
var Promise = require('polyfill-promise')
var promisify = require('promisify')

function get(x) {
  return new Promise(function (resolve, reject) {
    return registry({hive: 'HKCR', key: '\\' + x}).keys(function (e, i) {
      if (e) { return reject(e) }
        console.log(x, i)
      resolve(i)
    })
  })
}

function set(n, k, t, v) {
  return new Promise(function (resolve, reject) {
    return registry({hive: 'HKCR', key: '\\' + n}).set(k, t, v, function (e, r) {
      console.log(n, k, t, v)
      console.log('  ', e, r)
      return resolve(r)
    })
  })
}

function registerProtocolHandlerWindows (protocol, path, name) {
  return new Promise(function (resolve, reject) {
    if (typeof protocol !== 'string' || !scheme.test(protocol)) {
      throw new Error('required parameter `protocol` must be a valid uri scheme')
    }
    if (typeof path !== 'string' || !path) {
      throw new Error('missing required parameter `path`')
    }
    if (typeof name !== 'string' ||  !name) {
      throw new Error('missing required parameter `name`')
    }

    return set(protocol, '', 'REG_SZ', name).then(function () {
      return set(protocol, 'URL Protocol', 'REG_SZ', '')
    }).then(function () {
      return set(protocol + '\\shell\\open\\command', '', 'REG_SZ', path)
    })

    //throw new Error('not implemented')
  })
}

function check(protocol) {
  return new Promise(function (resolve, reject) {
    if (typeof protocol !== 'string' || !scheme.test(protocol)) {
      throw new Error('required parameter `protocol` must be a valid uri scheme')
    }
    return resolve(get(protocol)
      .then(function (x) {
        return !!x && x.length > 0
      })
      .catch(function () {
        return false
      }))
  })
}

module.exports = registerProtocolHandlerWindows
module.exports.check = check