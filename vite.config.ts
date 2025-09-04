import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import basicSsl from '@vitejs/plugin-basic-ssl';

export default defineConfig(({ command }) => ({
	plugins: [
		sveltekit(),
		...(command === 'serve' ? [basicSsl()] : [])
	],
	server: {
    proxy: {}
  }
}));
