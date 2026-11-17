import { copyFileSync, mkdirSync } from 'node:fs'
const pages = ['options', 'compare', 'journey', 'faqs', 'contact']
copyFileSync('dist/index.html', 'dist/404.html')
for (const p of pages) {
  mkdirSync(`dist/${p}`, { recursive: true })
  copyFileSync('dist/index.html', `dist/${p}/index.html`)
}
