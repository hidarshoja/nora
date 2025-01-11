import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { writeFileSync } from 'fs';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	esbuild: {
		loader: 'jsx', // Specify the loader type if needed
	},
	build:{
		manifest: true,
	},
	optimizeDeps: {
		include: ['jalaali-js']
	  }
});