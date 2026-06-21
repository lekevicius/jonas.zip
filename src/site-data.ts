import { readFileSync } from 'node:fs'
import { isAbsolute, resolve } from 'node:path'
import type { SiteData } from './types'

const DEFAULT_DATA_FILE = 'data.json'

const getFlagValue = (name: string) => {
  const flag = `--${name}`

  for (let index = 0; index < process.argv.length; index += 1) {
    const arg = process.argv[index]

    if (arg === flag) {
      const value = process.argv[index + 1]
      return value && !value.startsWith('--') ? value : undefined
    }

    if (arg.startsWith(`${flag}=`)) {
      return arg.slice(flag.length + 1)
    }
  }
}

const dataFile = getFlagValue('site-data') ?? getFlagValue('data') ?? process.env.SITE_DATA ?? process.env.npm_config_site_data ?? DEFAULT_DATA_FILE
const dataPath = isAbsolute(dataFile) ? dataFile : resolve(process.cwd(), dataFile)

const siteData = JSON.parse(readFileSync(dataPath, 'utf8')) as SiteData

export default siteData
