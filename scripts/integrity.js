const parser = require('node-html-parser')
const fs = require('fs')
const path = require('path')
const crypto = require('crypto')

const args = process.argv.slice(2)
const file = args[0]
const dir = path.dirname(path.resolve(file))
const root = parser.parse(fs.readFileSync(file).toString());

(async function () {
  for (const node of root.querySelectorAll('script[src]')) {
    await rewrite(node, 'src')
  }

  for (const node of root.querySelectorAll('link[rel=preload]')) {
    await rewrite(node, 'href')
  }

  console.log(root.toString())
})();

async function rewrite(node, attribute) {
  const src = node.attributes[attribute]
  const digest = Uint8ArrayToB64(await sha512(dir + src))
  node.setAttribute("integrity", `sha512-${digest}`)
}

// cat dist/_nuxt/7ed6ebb.js | openssl dgst -sha512 -binary | openssl base64 -A
async function sha512(path) {
  return await crypto.subtle.digest("SHA-512", fs.readFileSync(path).toString())
}

function Uint8ArrayToB64(input) {
  return new Buffer(input).toString('base64')
}
