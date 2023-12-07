import adapter from '@sveltejs/adapter-auto';
import { importAssets } from 'svelte-preprocess-import-assets'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter()
	},
	preprocess: [importAssets()]
};

export default config;
