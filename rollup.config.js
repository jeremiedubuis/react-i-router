import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

const dev = process.argv.indexOf('-w') > -1;


const plugins = [
    peerDepsExternal(),
    typescript(),
    replace(({
        'process.env.NODE_ENV': JSON.stringify(dev ? 'development' : 'production')
    })),
    babel({
        "babelHelpers": 'runtime',
        "exclude": "node_modules/**",
        "presets": ["@babel/env", "@babel/preset-react"],
        "plugins": [
            "@babel/plugin-proposal-class-properties",
            "@babel/plugin-transform-runtime"
        ]
    }),
    resolve(),
    commonjs()
];

if (!dev) {
    plugins.push(terser());
}

const globals = {
    'react': 'React',
    'react-dom': 'ReactDOM'
}

const lib = {
    input: 'lib/index.ts',
    output: [
        {
            file: pkg.main,
            format: 'cjs',
            globals
        },
        {
            file: pkg.module,
            format: 'esm',
            globals
        }
    ],
    plugins
};

const exampleClient = {
    input: 'example/client.tsx',
    output: {
        file: 'public/example.js',
        format: 'iife',
        globals
    },
    plugins: [
        ...plugins
    ],
    watch: {
        exclude: 'node_modules/**'
    }
};

const exampleServer = {
    input: 'example/server.tsx',
    output: {
        file: 'public/server.js',
        format: 'cjs',
        globals
    },
    plugins,
    watch: {
        exclude: 'node_modules/**'
    }
};

export default dev ? [lib, exampleClient, exampleServer] : lib;
