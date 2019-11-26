import nodeResolve from 'rollup-plugin-node-resolve';
import path from 'path';
import commonjs from 'rollup-plugin-commonjs';
import alias from 'rollup-plugin-alias';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
import { terser } from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';
import pkg from './package.json';

const env = process.env.NODE_ENV;
const extract = Boolean(process.env.STYLE_EXTRACT);
const format = process.env.FORMAT === 'cjs' ? 'cjs' : 'iife';

const config = {
  input: format === 'iife' ? './iife.js' : './src/index.js',
  external: Object.keys(pkg.peerDependencies || {}),
  output: {
    format,
    name: 'PaymentPageSdk'
  },
  plugins: [
    nodeResolve({
      modulesOnly: format === 'cjs'
    }),
    alias({
      src: path.resolve(process.cwd(), './src'),
      resolve: ['.js', '/index.js']
    }),
    commonjs({
      include: 'node_modules/**'
    }),
    babel({
      exclude: /node_modules/,
      presets: [['@babel/env', {
        targets: {
          browsers: ["last 2 versions", "ie >= 9"]
        },
        loose: true,
        modules: false 
      }]],
      plugins: [
        ['@babel/proposal-decorators', { legacy: true }],
        ['@babel/proposal-object-rest-spread', { loose: true }],
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-transform-object-assign',
        '@babel/plugin-proposal-private-methods',
      ].filter(Boolean),
      runtimeHelpers: true
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(env),
      'process.env.VERSION': `\'${pkg.version}\'`
    }),
    postcss({
      modules: true,
      extract,
      plugins: [autoprefixer()]
    })
  ]
}

if (format !== 'cjs' && env === 'production') {
  config.plugins.push(
    terser({
      compress: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        warnings: false
      }
    })
  )
}

export default config
