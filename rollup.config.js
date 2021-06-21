
import { terser } from 'rollup-plugin-terser'
import typescript from 'rollup-plugin-typescript2'
import vue from 'rollup-plugin-vue'

// Due to bug [Breaks with multiple outputs](https://github.com/TrySound/rollup-plugin-terser/issues/5) I had to create multiple configuration instead of a simpler one.

export default [
  {
    input: 'src/index.ts',
    output: {
      format: 'es',
      file: 'dist/vue3-animate-in-view.es.js'
    },
    external: ['vue'],
    plugins: [ vue(), typescript({useTsconfigDeclarationDir: true}), terser() ]
  },
  {
    input: 'src/index.ts',
    output: {
      format: 'cjs',
      file: 'dist/vue3-animate-in-view.cjs.js',
      exports: 'default'
    },
    external: ['vue'],
    plugins: [ vue(), typescript(), terser() ]
  }
]
