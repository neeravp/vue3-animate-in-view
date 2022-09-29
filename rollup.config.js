/* @ts-ignore */
import path from 'path'
import fs from 'fs'
// import ts from 'rollup-plugin-typescript2'
// import json from '@rollup/plugin-json'
import alias from '@rollup/plugin-alias'
import resolve from '@rollup/plugin-node-resolve'
import PostCSS from 'rollup-plugin-postcss'
import commonjs from '@rollup/plugin-commonjs'
import replace from '@rollup/plugin-replace'
import vue from 'rollup-plugin-vue'
import babel from '@rollup/plugin-babel'
import { terser } from 'rollup-plugin-terser'

// Get browserslist config and remove ie from es build targets
const esbrowserslist = fs.readFileSync('./.browserslistrc')
  .toString()
  .split('\n')
  .filter((entry) => entry && entry.substring(0, 2) !== 'ie');

const projectRoot = path.resolve(__dirname, '.')

const babelPresetEnvConfig = require('./babel.config')
  .presets.filter((entry) => entry[0] === '@babel/preset-env')[0][1];


const preVue = [
    alias({
        entries: [
            {
                find: '@',
                replacement: `${path.resolve(projectRoot, 'src')}`,
            },
        ],
    }),
]

const postVue = [
    // resolve({
    // //   extensions: ['.js', '.jsx', '.ts', '.tsx'],
    //   moduleDirectories: ['src', 'node_modules']
    // }),
    // Process only `<style module>` blocks.
    PostCSS({
      modules: {
        generateScopedName: '[local]___[hash:base64:5]',
      },
      include: /&module=.*\.css$/,
    }),
    // Process all `<style>` blocks except `<style module>`.
    PostCSS({ include: /(?<!&module=.*)\.css$/ }),
    commonjs(),
]

const replaceOptions = {
    'process.env.NODE_ENV': JSON.stringify('production'),
    preventAssignment: true
}

const babelConfig = {
    exclude: 'node_modules/**',
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
    babelHelpers: 'bundled',
}

// const moduleDirectories = ['src', 'node_modules']

// ESM/UMD/IIFE shared settings: externals
// Refer to https://rollupjs.org/guide/en/#warning-treating-module-as-external-dependency
const external = [
  'vue',
];
const globals = { vue: 'Vue' }

const buildFormats = []

const esConfig = {
    input: 'src/entry.esm.ts',
    external,
    output: {
        file: 'dist/vue-3-animate-in-view.esm.js',
        format: 'esm',
        exports: 'named'
    },
    plugins: [
        replace(replaceOptions),
        ...preVue,
        resolve({
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
          moduleDirectories: ['src', 'node_modules'],
        }),
        vue(),
        ...postVue,
        babel({
            ...babelConfig,
            presets: [
                [
                  '@babel/preset-env',
                  {
                    ...babelPresetEnvConfig,
                    targets: esbrowserslist,
                  },
                ],
              ],
        })
    ]
}

const umdConfig = {
    input: 'src/entry.ts',
    external,
    output: {
        compact: true,
        file: 'dist/vue-3-animate-in-view.ssr.js',
        format: 'cjs',
        name: 'Vue3AnimateInView',
        exports: 'auto',
        globals
    },
    plugins: [
      replace(replaceOptions),
      ...preVue,
      vue(),
      resolve({
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        moduleDirectories: ['src', 'node_modules'],
      }),
      ...postVue,
      babel({
          ...babelConfig,
          presets: [
              [
                '@babel/preset-env',
                {
                  ...babelPresetEnvConfig,
                  targets: esbrowserslist,
                },
              ],
            ],
      }),
    ],
}

const unpkgConfig = {
    input: 'src/entry.ts',
    external,
    output: {
        compact: true,
        file: 'dist/vue-3-animate-in-view.min.js',
        format: 'iife',
        name: 'Vue3AnimateInView',
        exports: 'auto',
        globals,
    },
    plugins: [
        replace(replaceOptions),
        ...preVue,
        vue(),
        resolve({
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
          moduleDirectories: ['src', 'node_modules'],
        }),
        ...postVue,
        babel({
            ...babelConfig,
            presets: [
                '@babel/preset-env',
                '@babel/preset-typescript'
            ]
        }),
        terser({
            output:{
                ecma: 5,
            },
        }),
    ]
}

buildFormats.push(esConfig)
buildFormats.push(umdConfig)
buildFormats.push(unpkgConfig)

export default buildFormats
