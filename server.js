import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.join(__dirname, 'dist');
const PORT = process.env.PORT || 3000;

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf'
};

const server = http.createServer((req, res) => {
  // Normalize URL to remove query strings and hashes
  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  let pathname = parsedUrl.pathname;
  
  // Safe path resolution inside DIST_DIR
  let safeSuffix = path.normalize(pathname).replace(/^(\.\.[\/\\])+/, '');
  let filePath = path.join(DIST_DIR, safeSuffix);

  fs.stat(filePath, (err, stats) => {
    if (!err && stats.isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }

    fs.readFile(filePath, (readErr, content) => {
      if (readErr) {
        // SPA Fallback: Route all client routes to dist/index.html
        const indexPath = path.join(DIST_DIR, 'index.html');
        fs.readFile(indexPath, (indexErr, indexContent) => {
          if (indexErr) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Build not found. Please run npm run build first.');
            return;
          }
          res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
          res.end(indexContent);
        });
        return;
      }

      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';
      const cacheControl = ext === '.html' ? 'no-cache' : 'public, max-age=31536000, immutable';

      res.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': cacheControl
      });
      res.end(content);
    });
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Glow & Care production server active on http://0.0.0.0:${PORT}`);
});
