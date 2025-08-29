  import express from 'express';
  import cors from 'cors';
  import { readFile, writeFile } from 'fs/promises';
  import path from 'path';
  import { fileURLToPath } from 'url';

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const app = express();
  app.use(cors());
  app.use(express.json());

  const PORT = process.env.PORT || 4000;
  const dbPath = path.join(__dirname, 'database.json');

  app.get('/products', async (_req, res) => {
    try {
      const raw = await readFile(dbPath, 'utf-8');
      const { products = [] } = JSON.parse(raw);
      res.json(products);
    } catch (err) {
      console.error('Read products error:', err);
      res.status(500).json({ error: 'Failed to read products' });
    }
  });

  app.get('/comments', async (_req, res) => {
    try {
      const raw = await readFile(dbPath, 'utf-8');
      const { comments = [] } = JSON.parse(raw);
      res.json(comments);
    } catch (err) {
      console.error('Read comments error:', err);
      res.status(500).json({ error: 'Failed to read comments' });
    }
  });

  app.delete('/products/:id', async (req, res) => {
    const id = String(req.params.id);
    try {
      const raw = await readFile(dbPath, 'utf-8');
      const db = JSON.parse(raw);
      const products = Array.isArray(db.products) ? db.products : [];

      const index = products.findIndex((p) => String(p.id) === id);
      if (index === -1) {
        return res.status(404).json({ error: `Product with id ${id} not found` });
      }

      const [removed] = products.splice(index, 1);
      const updated = { ...db, products };
      await writeFile(dbPath, JSON.stringify(updated, null, 2), 'utf-8');

      return res.json({ success: true, removed });
    } catch (err) {
      console.error('Delete product error:', err);
      return res.status(500).json({ error: 'Failed to delete product' });
    }
  });
  
  app.get('/products/sort', async (req, res) => {
    const { field, order, mode } = req.query;

    if (!field || typeof field !== 'string') {
      return res.status(400).json({ error: 'Field query parameter is required' });
    }

    const dir = String((order || mode || 'asc')).toLowerCase();
    if (dir !== 'asc' && dir !== 'desc') {
      return res.status(400).json({ error: 'Order/mode must be "asc" or "desc"' });
    }

    const getByPath = (obj, path) => {
      try {
        return path.split('.').reduce((acc, key) => (acc == null ? undefined : acc[key]), obj);
      } catch {
        return undefined;
      }
    };

    try {
      const raw = await readFile(dbPath, 'utf-8');
      const db = JSON.parse(raw);
      const products = Array.isArray(db.products) ? db.products : [];

      const sorted = [...products].sort((a, b) => {
        const valA = getByPath(a, field);
        const valB = getByPath(b, field);

        // Undefined/null handling: undefined always goes last in asc, first in desc
        const aU = valA === undefined || valA === null;
        const bU = valB === undefined || valB === null;
        if (aU && bU) return 0;
        if (aU) return dir === 'asc' ? 1 : -1;
        if (bU) return dir === 'asc' ? -1 : 1;

        const numA = Number(valA);
        const numB = Number(valB);
        const bothNumeric = Number.isFinite(numA) && Number.isFinite(numB);

        if (bothNumeric) {
          return dir === 'asc' ? numA - numB : numB - numA;
        }

        const strA = String(valA).toLowerCase();
        const strB = String(valB).toLowerCase();
        if (strA < strB) return dir === 'asc' ? -1 : 1;
        if (strA > strB) return dir === 'asc' ? 1 : -1;
        return 0;
      });

      res.json(sorted);
    } catch (err) {
      console.error('Sort products error:', err);
      res.status(500).json({ error: 'Failed to sort products' });
    }
  });
  

app.post('/comments', async (req, res) => {
  const { id, comment, date } = req.body;

  if (!id || !comment || !date) {
    return res.status(400).json({ error: 'id, comment та date обовʼязкові' });
  }

  try {
    const raw = await readFile(dbPath, 'utf-8');
    const db = JSON.parse(raw);
    const comments = Array.isArray(db.comments) ? db.comments : [];

    // Знаходимо існуючий об'єкт з цим id
    const existing = comments.find(c => String(c.id) === String(id));

    if (existing) {
      // Додаємо новий коментар у масив
      existing.comments = Array.isArray(existing.comments) ? existing.comments : [];
      existing.comments.push(comment);
      existing.date = date; // оновлюємо дату останнього коментаря
    } else {
      // Якщо об'єкта ще немає — створюємо його
      comments.push({ id: String(id), comments: [comment], date });
    }

    const updated = { ...db, comments };
    await writeFile(dbPath, JSON.stringify(updated, null, 2), 'utf-8');

    res.status(201).json({ id, comment, date });
  } catch (err) {
    console.error('Add comment error:', err);
    res.status(500).json({ error: 'Failed to add comment' });
  }
});
  

app.delete('/comments/:id/:index', async (req, res) => {
  const id = String(req.params.id);
  const indexToDelete = Number(req.params.index);

  if (isNaN(indexToDelete)) {
    return res.status(400).json({ error: 'Index має бути числом' });
  }

  try {
    const raw = await readFile(dbPath, 'utf-8');
    const db = JSON.parse(raw);
    const comments = Array.isArray(db.comments) ? db.comments : [];

    const existing = comments.find(c => String(c.id) === id);
    if (!existing) return res.status(404).json({ error: `Comment with id ${id} not found` });

    if (!Array.isArray(existing.comments) || indexToDelete < 0 || indexToDelete >= existing.comments.length) {
      return res.status(404).json({ error: `Comment at index ${indexToDelete} not found for id ${id}` });
    }

    const removed = existing.comments.splice(indexToDelete, 1)[0];
    existing.date = new Date().toISOString();

    await writeFile(dbPath, JSON.stringify(db, null, 2), 'utf-8');
    res.json({ success: true, removed });
  } catch (err) {
    console.error('Delete comment error:', err);
    res.status(500).json({ error: 'Failed to delete comment' });
  }
});

  
  app.get('/comments/:id', async (req, res) => {
    const id = String(req.params.id);
    try {
      const raw = await readFile(dbPath, 'utf-8');
      const { comments = [] } = JSON.parse(raw);
      const item = comments.find(c => String(c.id) === id);
  
      if (!item) {
        return res.status(404).json({ error: `No comments found for id ${id}` });
      }
  
      res.json(item.comments || []);
    } catch (err) {
      console.error('Read comments by id error:', err);
      res.status(500).json({ error: 'Failed to read comments by id' });
    }
  });
  app.patch('/products/:id', async (req, res) => {
    const id = String(req.params.id);
    const updates = req.body; // лише ті поля, які треба змінити
  
    try {
      const raw = await readFile(dbPath, 'utf-8');
      const db = JSON.parse(raw);
      const products = Array.isArray(db.products) ? db.products : [];
  
      const index = products.findIndex((p) => String(p.id) === id);
      if (index === -1) {
        return res.status(404).json({ error: `Product with id ${id} not found` });
      }
  
      const product = products[index];

      const updatedProduct = {
        ...product,
        ...updates,
        size: {
          ...product.size,
          ...(updates.size || {})
        }
      };
  
      products[index] = updatedProduct;
  
      await writeFile(dbPath, JSON.stringify({ ...db, products }, null, 2), 'utf-8');
  
      let updatedFieldValue: number;
      if (updates.size) {
        const key = Object.keys(updates.size)[0];
        updatedFieldValue = updatedProduct.size[key];
      } else {
        const key = Object.keys(updates)[0];
        updatedFieldValue = updatedProduct[key];
      }
  
      return res.json(updatedFieldValue);
    } catch (err) {
      console.error('Patch product error:', err);
      return res.status(500).json({ error: 'Failed to patch product' });
    }
  });
  


  app.listen(PORT, () => {
    console.log(`API running at http://localhost:${PORT}`);
  });