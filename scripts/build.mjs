import { spawnSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { postProcess } from '../post-process.js'

const rootDir = dirname(fileURLToPath(new URL('../package.json', import.meta.url)))
const astroBin = resolve(rootDir, 'node_modules/.bin/astro')
const astroCommand = existsSync(astroBin) ? astroBin : 'astro'

const result = spawnSync(astroCommand, ['build', ...process.argv.slice(2)], {
  cwd: rootDir,
  env: process.env,
  stdio: 'inherit',
})

if (result.error) {
  throw result.error
}

if (result.signal) {
  console.error(`Astro build stopped by ${result.signal}`)
  process.exit(1)
}

if (typeof result.status === 'number' && result.status !== 0) {
  process.exit(result.status)
}

await postProcess()
