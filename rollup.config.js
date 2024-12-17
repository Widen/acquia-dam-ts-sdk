import babel from '@rollup/plugin-babel'
import replace from '@rollup/plugin-replace'
import typescript from '@rollup/plugin-typescript'
import { resolve } from 'path'
import { dts } from 'rollup-plugin-dts'
import { readFile } from 'fs/promises'

const packageInfo = JSON.parse(
  await readFile(new URL('./package.json', import.meta.url))
)

const transpilePlugins = [
  babel({
    extensions: ['.ts'],
    include: resolve('src', '**', '*.ts'),
    babelHelpers: 'bundled',
  }),
  typescript({ tsconfig: './tsconfig.build.json' }),
  replace({
    values: {
      'dam-ts@development': `dam-ts@${packageInfo.version}`,
    },
    preventAssignment: true,
  }),
]

const typePlugins = [dts({ compilerOptions: { baseUrl: 'dist' } })]

const config = [
  {
    input: {
      index: 'src/index.ts',
      'apis/index': 'src/apis/index.ts',
      'client/index': 'src/client/index.ts',
    },
    output: {
      dir: 'dist',
      format: 'es',
      entryFileNames: '[name].mjs',
    },
    plugins: transpilePlugins,
  },
  {
    input: {
      index: 'src/index.ts',
      'apis/index': 'src/apis/index.ts',
      'client/index': 'src/client/index.ts',
    },
    output: {
      dir: 'dist',
      format: 'cjs',
      entryFileNames: '[name].cjs',
    },
    plugins: transpilePlugins,
  },
  {
    input: {
      'index.d': 'dist/index.d.ts',
      'apis/index.d': 'dist/apis/index.d.ts',
      'client/index.d': 'dist/client/index.d.ts',
    },
    output: {
      dir: 'dist',
      format: 'es',
      preserveModules: true,
      entryFileNames: '[name].ts',
    },
    plugins: typePlugins,
  },
]

export default config
