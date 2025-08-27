import fs from 'fs';
import { promises as fsp } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.resolve(__dirname, '..', 'db.json');

function log(msg) {
  const ts = new Date().toISOString();
  console.log(`[${ts}] ${msg}`);
}

async function readDb() {
  try {
    const raw = await fsp.readFile(DB_PATH, 'utf-8');
    const json = JSON.parse(raw);
    const products = Array.isArray(json?.products) ? json.products.length : 0;
    const comments = Array.isArray(json?.comments) ? json.comments.length : 0;
    log(`Read db.json OK → products: ${products}, comments: ${comments}`);
    return json;
  } catch (err) {
    log(`Error reading db.json: ${err.message}`);
    return null;
  }
}

function randomId() {
  return Math.random().toString(36).slice(2, 10);
}

async function appendSample() {
  const data = (await readDb()) || {};
  if (!Array.isArray(data.products)) data.products = [];

  const newProduct = {
    id: randomId(),
    imageUrl: 'https://via.placeholder.com/150',
    name: `Sample ${Date.now()}`,
    count: Math.floor(Math.random() * 100) + 1,
    size: { width: 50, height: 50 },
    weight: '100g',
    comments: [],
  };

  data.products.push(newProduct);

  try {
    await fsp.writeFile(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
    log(`Appended sample product with id=${newProduct.id}`);
  } catch (err) {
    log(`Error writing db.json: ${err.message}`);
  }
}

async function startWatcher({ intervalMs = 5000 } = {}) {
  log(`Watching ${DB_PATH}`);

  // Periodic read
  setInterval(readDb, intervalMs);

  // File change watch (best-effort)
  try {
    fs.watch(DB_PATH, { persistent: true }, (eventType) => {
      if (eventType === 'change') {
        readDb();
      }
    });
  } catch (err) {
    log(`fs.watch not available: ${err.message}`);
  }

  // Initial read
  await readDb();
}

// CLI handling
const args = process.argv.slice(2);
const shouldAppend = args.includes('--append');
const intervalArg = args.find((a) => a.startsWith('--interval='));
const intervalMs = intervalArg ? Number(intervalArg.split('=')[1]) : 5000;

(async () => {
  if (shouldAppend) {
    await appendSample();
  }
  await startWatcher({ intervalMs: Number.isFinite(intervalMs) ? intervalMs : 5000 });
})();
