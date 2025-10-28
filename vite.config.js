import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	define: {
		// Make environment variables available to the client
		'import.meta.env.VITE_APP_NAME': JSON.stringify(process.env.APP_NAME || 'AWS U-Turn Clients'),
		'import.meta.env.VITE_APP_ENV': JSON.stringify(process.env.APP_ENV || 'development'),
		'import.meta.env.VITE_API_BASE_URL': JSON.stringify(process.env.API_BASE_URL || 'http://localhost:5173'),
		'import.meta.env.VITE_LOG_LEVEL': JSON.stringify(process.env.LOG_LEVEL || 'debug')
	}
});