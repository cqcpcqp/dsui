import typescript from 'rollup-plugin-typescript2';
import scss from 'rollup-plugin-scss';
import { terser } from 'rollup-plugin-terser';
// node v22 breaking change: remove import assertions in favor of "with" clause
import pkg from './package.json' with { type: 'json' };

const isDev = process.env.NODE_ENV === 'development';

/**
 * @type {import('rollup').RollupOptions}
 */
const option = {
  watch: isDev
    ? {
        include: ['src/**', '../ds-core/**', '../ds-headless/**'],
        exclude: ['node_modules/**', '../ds-core/node_modules/**'],
      }
    : false,
  input: 'src/index.ts',
  output: {
    file: './umd/index.mini.js',
    format: 'umd',
    name: 'ds',
  },
  external: [
    // 现在ds-core还是作为ds-ui的一部分被打包，所以需要ds-core
    ...Object.keys(pkg.dependencies || {}).filter((dep) => dep !== 'ds-core'),
    ...Object.keys(pkg.devDependencies || {}),
  ],
  // plugins: [typescript(), scss({ output: false }), terser()],
  plugins: [typescript(), scss({ output: false }), ...(isDev ? [] : [terser()])],
};

export default option;
