import express from "express";
import fs from "fs";
import cors from "cors";

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors());

// Функція для зчитування даних з файлу
const getDatabase = () => {
  const rawData = fs.readFileSync("./database.json");
  return JSON.parse(rawData);
};

app.get("/products", (req, res) => {
  try {
    const { sortField = "name", sortOrder = "asc" } = req.query;
    const db = getDatabase();
    let products = db.products || [];

    if (sortField && ["name", "count"].includes(sortField)) {
      products.sort((a, b) => {
        const aValue = a[sortField];
        const bValue = b[sortField];

        if (typeof aValue === "string") {
          return sortOrder === "asc"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }
        return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
      });
    }

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Помилка читання файлу" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
