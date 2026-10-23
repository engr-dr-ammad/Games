import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    target: 'ES2020',
    lib: {
      entry: 'src/index.ts',
      name: 'GamesEngine',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'js' : 'cjs'}`,
    },
    rollupOptions: {
      external: ['three'],
      output: {
        globals: {
          three: 'THREE',
        },
      },
    },
  },
  server: {
    port: 5173,
  },
});
