const parser = require('node-html-parser')
const fs = require('fs')
const path = require('path')

const args = process.argv.slice(2)
const file = args[0]
const dir = path.dirname(path.resolve(file))

const root = parser.parse(fs.readFileSync(file).toString())

root.querySelectorAll('link[rel="preload"]').forEach((link) => {
  link.remove()
})

root.querySelectorAll('script[src]').forEach((script) => {
  const src = script.attributes['src']
  const content = fs.readFileSync(dir + src).toString()
  script.replaceWith(`<script>${content}</script>`)
})

console.log(root.toString())
