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

    for (const entry of fs.readdirSync(`${__dirname}/pages`, { withFileTypes: true })) {
        if (!entry.isDirectory()) continue;
        if (!entry.name.startsWith('page-')) continue;

        const html = path.resolve(__dirname, entry.name, 'index.html');
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
