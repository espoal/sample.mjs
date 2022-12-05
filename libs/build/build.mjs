import esbuild from 'esbuild'
import { pnpPlugin } from '@yarnpkg/esbuild-plugin-pnp'
import { watchHelper } from "./watch.mjs"
import { timeNow } from "./time.mjs"

const baseOptions = {
    plugins: [ pnpPlugin() ],
    bundle: true,
    splitting: false,
    format: 'esm',
    publicPath: '/',
    platform: 'node',
    target: 'esnext',
    treeShaking: true,
    outExtension: { '.js': '.mjs' },
    tsconfig: 'tsconfig.json'
}

export const buildHelper = async ({
    name,
    entryPoints = [ 'No entrypoint specified' ],
    external = [],
    outDir = '',
    minify = false,
    watch = false
}) => {

    const options = {
        ...baseOptions,
        entryPoints,
        external,
        outdir: 'dist/' + outDir,
    }

    if (minify) {
        options.minify = true
    }

    if (watch) {
        options.watch = watchHelper(name)
    }

    await esbuild.build(options)
    console.log('Build successful at time: ' + timeNow() + ' for: ' + name)

}
