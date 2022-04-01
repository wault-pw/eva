const parser = require('node-html-parser')
const fs = require('fs')
const path = require('path')

const args = process.argv.slice(2)
const file = args[0]
const dir = path.dirname(path.resolve(file))
const root = parser.parse(fs.readFileSync(file).toString())

const body = root.querySelector('body')

root.querySelectorAll('link[rel="preload"]').forEach((link) => {
  link.remove()
})

root.querySelectorAll('link[href][rel=stylesheet]').forEach((style) => {
  const src = style.attributes['href']
  const content = fs.readFileSync(dir + src).toString()
  style.replaceWith(`<style>${content}</style>`)
})

root.querySelectorAll('script[src]').forEach((script) => {
  const src = script.attributes['src']
  const content = fs.readFileSync(dir + src).toString()
  body.appendChild(script.clone()).replaceWith(`<script>${content}</script>`)
  script.remove()
})

console.log(root.toString())
