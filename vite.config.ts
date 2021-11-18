import fs from 'fs';
import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import ViteComponents from 'unplugin-vue-components/vite';
import visualizer from 'rollup-plugin-visualizer';

export default defineConfig({
  define: {
    'process.env': process.env
  },
  plugins: [
    vue({
      script: {
        refSugar: true
      }
    }),
    ViteComponents({
      dirs: ['src/components', 'src/plugins'],
      directoryAsNamespace: true
    }),
    visualizer({
      filename: './dist/stats.html',
      template: 'sunburst',
      gzipSize: true
    }),
    () => { // create list of plugins from directories
      fs.writeFileSync(
        'src/plugins/_plugins.json',
        JSON.stringify(
          fs.readdirSync('src/plugins', { withFileTypes: true })
          .filter(file => file.isDirectory())
          .map(dir => dir.name)
        )
      )
    }
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    },
    dedupe: ['@popperjs/core']
  },
  optimizeDeps: {
    include: ['color'],
    // @ts-ignore
    allowNodeBuiltins: ['stream']
  }
});
