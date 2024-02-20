import typescript from 'rollup-plugin-typescript2';
import scss from 'rollup-plugin-scss';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json' assert { type: 'json' };

/**
 * @type {import('rollup').RollupOptions}
 */
const option = {
  input: 'src/index.ts',
  output: {
    file: './umd/index.mini.js',
    format: 'umd',
    name: 'ds',
  },
  external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.devDependencies || {})],
  // plugins: [typescript(), scss({ output: false }), terser()],
  plugins: [typescript(), scss({ output: false })],
};

export default option;
