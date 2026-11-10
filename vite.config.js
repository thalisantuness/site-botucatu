import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';

function copyDirRecursive(srcDir, destDir) {
  if (!fs.existsSync(srcDir)) return;
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  for (const entry of fs.readdirSync(srcDir, { withFileTypes: true })) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);
    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else if (!fs.existsSync(destPath)) {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function ensureImagesPlugin() {
  const syncAssets = () => {
    try {
      const targetDir = path.resolve(process.cwd(), 'public', 'images');
      const sourceDir = 'C:/Users/Thalis.silva/.gemini/antigravity/scratch/instituto-botucatu/public/images';
      copyDirRecursive(sourceDir, targetDir);
    } catch {
      // Ignore errors
    }
  };

  return {
    name: 'ensure-images',
    configResolved() {
      syncAssets();
    },
    buildStart() {
      syncAssets();
    }
  };
}

export default defineConfig({
  plugins: [react(), ensureImagesPlugin()],
  server: {
    port: 3000,
    host: true
  }
});
