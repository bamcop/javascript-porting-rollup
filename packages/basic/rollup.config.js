// rollup.config.js
// https://www.rollupjs.com/command-line-interface/#config-intellisense
import { defineConfig } from 'rollup'
import path from 'path'

const src_dir = path.join(__dirname, 'src')

// https://rollupjs.org/troubleshooting/#warning-treating-module-as-external-dependency
// Rollup will only resolve relative module IDs by default
export default defineConfig({
    input: 'src/index.js',
    output: {
        dir           : 'dist',
        format        : 'esm',
        chunkFileNames: "[name].js",
        manualChunks: (id) => {
            if (id.startsWith(src_dir)) {
                console.error(path.relative(src_dir, id), [id])
                return remove_ext(path.relative(src_dir, id))
            }
            return undefined
        }
    },  
})

/**
 * 去除文件扩展名
 * @param {string} filename 
 */
const remove_ext = (filename) => {
    return filename.split('.').slice(0, -1).join('.')
}
