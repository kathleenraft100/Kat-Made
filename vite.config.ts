import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { defineConfig, Plugin } from 'vite';

function patternSavePlugin(): Plugin {
  return {
    name: 'pattern-save-plugin',
    configureServer(server) {
      server.middlewares.use('/api/save-pattern', (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end(JSON.stringify({ error: 'Method not allowed' }));
          return;
        }

        let body = '';
        req.on('data', (chunk) => {
          body += chunk;
        });

        req.on('end', () => {
          try {
            const { specimenId, dataUrl } = JSON.parse(body);
            if (!specimenId || !dataUrl) {
              res.statusCode = 400;
              res.end(JSON.stringify({ error: 'Missing specimenId or dataUrl' }));
              return;
            }

            // Extract base64 data
            const matches = dataUrl.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
            if (!matches || matches.length !== 3) {
              res.statusCode = 400;
              res.end(JSON.stringify({ error: 'Invalid data URL format' }));
              return;
            }

            const ext = matches[1].includes('jpeg') || matches[1].includes('jpg') ? 'jpg' : 'png';
            const buffer = Buffer.from(matches[2], 'base64');

            const publicPatternsDir = path.resolve(__dirname, 'public', 'patterns');
            if (!fs.existsSync(publicPatternsDir)) {
              fs.mkdirSync(publicPatternsDir, { recursive: true });
            }

            const fileName = `${specimenId}.${ext}`;
            const targetPath = path.join(publicPatternsDir, fileName);
            fs.writeFileSync(targetPath, buffer);

            const publicUrl = `/patterns/${fileName}`;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: true, url: publicUrl }));
          } catch (error) {
            console.error('[patternSavePlugin] Error saving pattern file:', error);
            res.statusCode = 500;
            res.end(JSON.stringify({ error: String(error) }));
          }
        });
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), patternSavePlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
