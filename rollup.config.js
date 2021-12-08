import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
// import { nodeResolve } from '@rollup/plugin-node-resolve';
// import nodePolyfills from 'rollup-plugin-node-polyfills';
// import nodePolyfills from 'rollup-plugin-polyfill-node';
// import polyfills from "rollup-plugin-node-polyfills";
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import css from 'rollup-plugin-css-only';


import { config } from 'dotenv';
import replace from '@rollup/plugin-replace';

// import json from "@rollup/plugin-json";


config().parsed;




const production = !process.env.ROLLUP_WATCH;

function serve() {
	let server;

	function toExit() {
		if (server) server.kill(0);
	}

	return {
		writeBundle() {
			if (server) return;
			server = require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
				stdio: ['ignore', 'inherit', 'inherit'],
				shell: true
			});

			process.on('SIGTERM', toExit);
			process.on('exit', toExit);
		}
	};
}


import postcss from 'rollup-plugin-postcss';
// import sveltePreprocess from 'svelte-preprocess';



import alias from '@rollup/plugin-alias';



const aliases = alias({
	resolve: ['.svelte', '.js'], //optional, by default this will just look for .js files or folders
	entries: [
		{ find: 'components', replacement: 'src/components' },
		{ find: 'layouts', replacement: 'src/layouts' },
		{ find: 'views', replacement: 'src/views' },
		{ find: 'store', replacement: 'src/store' },
		{ find: 'utils', replacement: 'src/utils' },
	]
});


export default {
	input: 'src/main.js',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: 'public/build/bundle.js'
	},
	plugins: [
		svelte({
			compilerOptions: {
				// enable run-time checks when not in production
				dev: !production
			}
		}),
		// we'll extract any component CSS out into
		// a separate file - better for performance
		css({ output: 'bundle.css' }),


		replace({
			'process.env.NODE_ENV': JSON.stringify( 'production' ),
			// 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
			// stringify the object       
			app_: JSON.stringify({
				env: {
					IS_PROD: production,
					TEST: 'Test123',
					// SECRET_KEY_URL_TXN: process.env.
					// STREAMS_API_URL: process.env.AUTH_API_URL,
					// MAINTENANCE: process.env.MAINTENANCE,
					// HCAPTCHA_SITE_KEY: process.env.HCAPTCHA_SITE_KEY,
				}
			}),
		}),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration -
		// consult the documentation for details:
		// https://github.com/rollup/plugins/tree/master/packages/commonjs
		resolve({
			browser: true,
			dedupe: ['svelte'],
			// custom: { 'node-resolve': { isRequire: true } }
		}),
		commonjs(),


		postcss(),


		// polyfills(),


		// nodePolyfills(),


		aliases,

		// json(),

		// nodeResolve(
		// 	{ preferBuiltins: false },
		// ),

		// In dev mode, call `npm run start` once
		// the bundle has been generated
		!production && serve(),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && livereload('public'),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser()
	],
	watch: {
		clearScreen: false
	}
};


