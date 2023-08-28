import { defineConfig } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import vueJsx from "@vitejs/plugin-vue-jsx";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue({ script: { defineModel: true } }),vueJsx(), cssInjectedByJsPlugin()],
	build: {
		lib: {
			// src/indext.ts is where we have exported the component(s)
			entry: resolve(__dirname, "src/index.ts"),
			name: "vue-flow-extended",
			// the name of the output files when the build is run
			fileName: "vue-flow-extended",
		},
		rollupOptions: {
			// make sure to externalize deps that shouldn't be bundled
			// into your library
			external: ["vue"],

			output: {
				manualChunks: undefined,
				// Provide global variables to use in the UMD build
				// for externalized deps
				globals: {
					vue: "Vue",
				},
			},
		},
	},
});