import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginModuleFederation } from '@module-federation/rsbuild-plugin';

export default defineConfig({
  plugins: [
    pluginReact(),
    pluginModuleFederation({
      filename: 'remoteEntry.js',
      name: 'f_inspect',
      exposes: {
        './Component': './src/components/ProviderComponent.tsx',
        './Home': './src/pages/Home.tsx',
        './routes': './src/routes/index.tsx',
      },
    }),
  ],
  tools: {  
    rspack: {
      output: {
        publicPath: 'auto',
      }      
    }
  },
  server: {
    port: 3001,
  },
});
