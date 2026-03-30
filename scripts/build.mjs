#!/usr/bin/env node
/**
 * Build script: concatenates source JS modules into public/zad-app.js
 *
 * Source files in src/js/ are concatenated in order (defined below).
 * All code shares the same scope — no ES module boundaries.
 * esbuild is used only for optional minification in production.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const SRC = join(ROOT, 'src', 'js');
const OUT = join(ROOT, 'public', 'zad-app.js');

// Order matters — later files depend on earlier ones
const SOURCE_FILES = [
  'config.js',        // Constants, globals, state
  'ui-utils.js',      // Theme, animations, formatters, pills, layout sync
  'demo.js',          // Demo mode (portfolio + transactions)
  'supabase.js',      // Supabase client, auth, and data layer
  'auth.js',          // Google Identity Services, sign in/out, data fetching
  'portfolio.js',     // Price fetching, dashboard, holdings, trades, allocation
  'advisor.js',       // Advisor engine + UI
  'nav.js',           // Sidebar, hub, navigation, home page
  'charts.js',        // Chart.js rendering (pie, waterfall, historical)
  'transactions.js',  // Transactions dashboard, calendar, categories, insights
  'net-worth.js',     // Net worth page
  'budget.js',        // Budget page, categories management
];

const isMinify = process.argv.includes('--minify');
const isWatch = process.argv.includes('--watch');

function build() {
  let output = '';
  for (const file of SOURCE_FILES) {
    const content = readFileSync(join(SRC, file), 'utf-8');
    output += `// ── ${file} ──\n${content}\n\n`;
  }

  if (isMinify) {
    // Use esbuild for minification
    import('esbuild').then(({ transformSync }) => {
      const result = transformSync(output, { minify: true, target: 'es2020' });
      writeFileSync(OUT, result.code);
      console.log(`Built ${OUT} (minified)`);
    });
  } else {
    writeFileSync(OUT, output);
    console.log(`Built ${OUT} (${SOURCE_FILES.length} modules, ${output.split('\n').length} lines)`);
  }
}

if (isWatch) {
  const { watch } = await import('fs');
  build();
  console.log('Watching src/js/ for changes...');
  watch(SRC, { recursive: true }, (event, filename) => {
    if (filename?.endsWith('.js')) {
      console.log(`Changed: ${filename}`);
      build();
    }
  });
} else {
  build();
}
