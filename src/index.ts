import { dirname } from 'node:path'
import type { Plugin } from 'vite'
import fg from 'fast-glob'
export interface Options {

}

const importGlobRE = /\bimport\.meta\.globNext\((.*)\)/g
export default function (_options: Options = {}): Plugin {
  return {
    name: 'globNext',
    transform(code, id) {
      const matchs = Array.from(code.matchAll(importGlobRE))
      if (!matchs.length) {
        return
      }
      matchs.forEach(async (match) => { // [index:,input:]
        const glob = match[1].slice(1, -1)
        const files = await fg(glob, { dot: true, cwd: dirname(id) })
        const start = match.index!
        const end = start + match[0].length
        const replacement = `{${files.map(i => `'${i}':()=>import('${i}')`).join(',')}}`
        code = code.slice(0, start) + replacement + code.slice(end)
      })

      return code
    },
  }
}
