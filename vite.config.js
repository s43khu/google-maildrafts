import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/anon-chat",
  plugins: [react()],
  //     // http: require.resolve('rollup-plugin-node-builtins'),
  //     // util: require.resolve('rollup-plugin-node-builtins'),
  //     // stream: require.resolve('rollup-plugin-node-builtins'),
  //     // buffer: require.resolve('rollup-plugin-node-builtins'),
  //     // process: require.resolve('rollup-plugin-node-builtins'),
  //     // url: require.resolve('rollup-plugin-node-builtins'),
  //     // querystring: require.resolve('rollup-plugin-node-builtins'),
  //   },
  // },
});
