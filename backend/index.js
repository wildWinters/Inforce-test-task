import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Resolve path to ../db.json regardless of where the server is started from
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.resolve(__dirname, "..", "db.json");

const readDb = () => {
  const raw = fs.readFileSync(DB_PATH, "utf-8");
  return JSON.parse(raw);
};

const getProducts = () => {
  const db = readDb();
  return Array.isArray(db?.products) ? db.products : [];
};

const getByPath = (obj, dotPath) => {
  if (!dotPath) return undefined;
  return dotPath.split(".").reduce((acc, key) => (acc == null ? undefined : acc[key]), obj);
};

app.get("/products", (req, res) => {
  // Primary: field + mode; Fallback: _sort + _order
  const field = (req.query.field ?? req.query._sort) && String(req.query.field ?? req.query._sort);
  const modeRaw = (req.query.mode ?? req.query._order) && String(req.query.mode ?? req.query._order).toLowerCase();

  let products = getProducts();

  if (field) {
    const mode = modeRaw === "desc" ? "desc" : "asc"; // default asc
    const order = mode === "desc" ? -1 : 1;
    products = [...products].sort((a, b) => {
      const aValue = getByPath(a, field);
      const bValue = getByPath(b, field);

      if (aValue == null && bValue == null) return 0;
      if (aValue == null) return -1 * order;
      if (bValue == null) return 1 * order;

      if (typeof aValue === "number" && typeof bValue === "number") {
        return (aValue - bValue) * order;
      }

      // Fallback to string compare
      return String(aValue).localeCompare(String(bValue)) * order;
    });
  }

  res.json(products);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
