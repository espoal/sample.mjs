import { buildHelper } from '@libs/build'
import process, {argv} from 'node:process'

let watch = false
if ( argv.includes('watch') ) {
    watch = true
}

let isProd = false
if ( argv.includes('prod') ) {
    process.env.NODE_ENV = 'production'
    isProd = true
}

console.log(`Starting ${isProd ? 'production' : 'dev' } build`)

await buildHelper({
    name: 'ts',
    entryPoints: ['src/index.ts'],
    ssr: true,
    isProd,
    watch
})


await buildHelper({
    name: 'test',
    entryPoints: ['src/test.mjs'],
    ssr: true,
    isProd,
    watch
})
