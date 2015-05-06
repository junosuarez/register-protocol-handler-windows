var scheme = /^[a-zA-Z][a-zA-Z0-9\+\-\.]*$/ // http://tools.ietf.org/html/rfc3986 Appendix A
var Promise = require('polyfill-promise')
var edge = require('pr-edge')

var getE = edge(function () {/*
  using Microsoft.Win32;
  using System.Threading.Tasks;

  public class Startup
  {
    public async Task<object> Invoke(object path) { 
      return Registry.GetValue((string) path, "", null);
    }
  }
*/})

var _register = edge(function () {/*
  using Microsoft.Win32;
  using System.Threading.Tasks;
  using System.Collections.Generic;

  public class Startup
  {
    public async Task<object> Invoke(IDictionary<string, object> argv) { 
      string protocol = (string) argv["protocol"];
      string path = (string) argv["path"];
      string name = (string) argv["name"];

      Registry.SetValue("HKEY_CLASSES_ROOT\\"+protocol, "", name);
      Registry.SetValue("HKEY_CLASSES_ROOT\\"+protocol+"\\shell\\open\\command", "", path);

      return null;

    }
  }
*/})

function checkE(protocol) {
  return getE('HKEY_CLASSES_ROOT\\'+protocol)
    .then(function (exists) {
      return !!exists
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

    _register({protocol: protocol, path: path, name: name}).then(null, function (err) {
      if (err.name = 'System.UnauthorizedAccessException') {
        throw new Error('Unauthorized access: ' + err.Message +' Run process ' + process.argv[0] + ' as administrator.')
      }
      else throw err
    })
    .then(resolve, reject)

  })
}

module.exports = registerProtocolHandlerWindows
module.exports.check = checkE