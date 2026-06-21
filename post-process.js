import { existsSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { extname, join, relative, sep } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { minify } from 'html-minifier-terser'

const rootDir = fileURLToPath(new URL('.', import.meta.url))
const distDir = join(rootDir, 'dist')
const textExtensions = new Set(['.css', '.html', '.js', '.json', '.mjs', '.txt', '.webmanifest', '.xml'])

const walkFiles = (directory) => {
  if (!existsSync(directory)) {
    return []
  }

  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = join(directory, entry.name)
    return entry.isDirectory() ? walkFiles(entryPath) : [entryPath]
  })
}

const toAssetPath = (filePath) => relative(distDir, filePath).split(sep).join('/')

const readReferenceText = () =>
  walkFiles(distDir)
    .filter((filePath) => textExtensions.has(extname(filePath)))
    .map((filePath) => readFileSync(filePath, 'utf8'))
    .join('\n')

const isReferenced = (assetPath, referenceText) => {
  const encodedAssetPath = assetPath.split('/').map(encodeURIComponent).join('/')
  return [assetPath, `/${assetPath}`, encodedAssetPath, `/${encodedAssetPath}`].some((needle) => referenceText.includes(needle))
}

const removeIfUnreferenced = (filePath, referenceText) => {
  if (!existsSync(filePath)) {
    return false
  }

  const assetPath = toAssetPath(filePath)
  if (isReferenced(assetPath, referenceText)) {
    return false
  }

  rmSync(filePath)
  return true
}

export const postProcess = async () => {
  const htmlPath = join(distDir, 'index.html')

  if (existsSync(htmlPath)) {
    const minified = await minify(readFileSync(htmlPath, 'utf8'), {
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true,
      removeComments: true,
    })

    writeFileSync(htmlPath, minified, 'utf8')
  }

  const referenceText = readReferenceText()
  const astroDir = join(distDir, '_astro')
  const svgCandidates = [
    join(distDir, 'favicon.svg'),
    ...walkFiles(astroDir).filter((filePath) => extname(filePath) === '.svg'),
  ]

  for (const svgPath of svgCandidates) {
    removeIfUnreferenced(svgPath, referenceText)
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  postProcess().catch((error) => {
    console.error(error)
    process.exit(1)
  })
}
