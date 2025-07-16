import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			"@components": path.resolve(__dirname, "./src/components"),
			"@helpers": path.resolve(__dirname, "./src/helpers"),
			"@assets": path.resolve(__dirname, "./src/assets"),
			"@utils": path.resolve(__dirname, "./src/utils"),
			"@controllers": path.resolve(__dirname, "./src/controllers"),
			"@repositories": path.resolve(__dirname, "./src/repositories"),
			"@stores": path.resolve(__dirname, "./src/stores")
		}
	},
	server: {
		host: true,
		port: 5173,
		cors: true,
		allowedHosts: [".ngrok-free.app"]
	}
});
