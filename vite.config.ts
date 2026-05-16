import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getHtmlInputs() {
    const rv: Record<string, string> = {
        main: path.resolve(__dirname, 'index.html'),
    };

    const pagesDir = path.resolve(__dirname, 'pages');

    for (const entry of fs.readdirSync(pagesDir, { withFileTypes: true })) {
        if (!entry.isDirectory()) continue;

        const html = path.resolve(pagesDir, entry.name, 'index.html');
        if (fs.existsSync(html)) rv[entry.name] = html;
    }

    return rv;
}

export default defineConfig({
    build: {
        rollupOptions: {
            input: getHtmlInputs(),
        },
    },
});
