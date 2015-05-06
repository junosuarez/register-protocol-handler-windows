# register-protocol-handler-windows
register protocol handlers on Windows

## usage
```js
var registerProtocolHandler = require('register-protocol-handler-windows')

var register = registerProtocolHandler('foo', 'c:\\foo.exe', 'The Foo Protocol')

register.then(function () {
  console.log('registered ok!')
})
.catch(function (e) {
  console.log('registration failed:', e)
})
```


## api
Matches (as closesly as possible) the [DOM Navigator.registerProtocolHandler API](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/registerProtocolHandler)

`registerProtocolHandler(protocol, path, name) => Promise`


## installation

    $ npm install register-protocol-handler-windows


## running the tests

From package root:

    $ npm install
    $ npm test


## related documentation

[MSDN: Registering an Application to a URI Scheme](https://msdn.microsoft.com/en-us/library/aa767914.aspx)

## contributors

- jden <jason@denizac.org>


## license

ISC. (c) MMXV jden <jason@denizac.org>. See LICENSE.md
