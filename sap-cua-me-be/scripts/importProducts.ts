// scripts/importProducts.ts
import mongoose from "mongoose";
import XLSX from "xlsx";
import dotenv from "dotenv";
import Product from "../models/Product"; // Adjust path based on your project structure
import path from "path";

dotenv.config();

type RecordData = {
  name: string;
  description: string;
  images?: string; // Assuming this could be a comma-separated string in Excel
  productType: string;
  brand: string;
  image: string;
  "category (Array)": string; // Comma-separated string in Excel
  "tags (Array)"?: string; // Comma-separated string in Excel
  price: string | number;
  "size (array)"?: string; // Comma-separated string in Excel
  "colors (array)"?: string; // Comma-separated string in Excel
  "varieties (array)"?: string; // Comma-separated names of varieties
  isAvailable?: string | boolean;
  isFeatured?: string | boolean;
  bestSeller?: string | boolean;
};

// Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI || "";
if (!MONGO_URI) {
  console.error("MONGO_URI is not defined in .env file");
  process.exit(1);
}

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err: Error) => {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
  });

// Function to parse varieties from the Excel rows
function parseVarieties(namesStr: string, pricesStr: string) {
  const names =
    namesStr
      ?.split(",")
      .map((name: string) => name.trim())
      .filter((name) => !!name) || [];
  const prices =
    pricesStr
      ?.split(",")
      .map((price: string) => parseFloat(price.trim()))
      .filter((p) => !isNaN(p)) || [];

  // 🟡 If no variety names provided, return an empty array
  if (!names.length) {
    return [];
  }

  // Show warning for mismatched lengths (excluding single price case)
  if (names.length !== prices.length && prices.length !== 1) {
    console.warn(
      `Varieties names and prices length mismatch (Names: ${names.length}, Prices: ${prices.length})`
    );
    return [];
  }

  return names.map((name, index) => ({
    name,
    price: prices[index] || prices[0],
  }));
}

// Function to parse prices from string or array
function parsePrices(priceValue: string | number | number[]): number[] {
  if (Array.isArray(priceValue)) {
    // If already an array, convert each item to number
    return priceValue.map(
      (price) => parseFloat(String(price).replace(/[^\d.]/g, "")) || 0
    );
  }

  if (typeof priceValue === "string") {
    // If string (e.g., "100000,200000"), split and convert to numbers
    return priceValue
      .split(",")
      .map((p) => parseFloat(p.trim().replace(/[^\d.]/g, "")) || 0);
  }

  // If single number, return it as an array
  return [priceValue];
}
// Function to import products from Excel
async function importProducts(filePath: string) {
  try {
    // Read the Excel file
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = XLSX.utils.sheet_to_json<RecordData>(
      workbook.Sheets[sheetName]
    );

    // Map and transform data
    console.log(sheet[0]); // Show the first row to inspect keys
    const products = sheet.map((row: RecordData) => {
      const prices = parsePrices(row["price"]); // Use parsePrices here

      return {
        name: row["name"]?.trim(),
        description: row["description"]?.trim(),
        images: row["image"]
          ? Array.isArray(row["image"])
            ? row["image"]
            : row["image"].split(/[,\s]+/).filter(Boolean)
          : [],
        productType: row["productType"],
        brand: row["brand"],
        category: Array.isArray(row["category (Array)"])
          ? row["category (Array)"]
          : row["category (Array)"]?.split(",").map((c: string) => c.trim()),
        tags: Array.isArray(row["tags (Array)"])
          ? row["tags (Array)"]
          : row["tags (Array)"]?.split(",").map((tag: string) => tag.trim()),

        // Use parsed prices here
        price: prices.length === 1 ? prices[0] : Math.min(...prices), // Store lowest price if multiple
        varieties: parseVarieties(
          row["varieties (array)"] || "",
          prices.join(",") // Convert number[] back to string
        ), // Pass parsed prices to varieties

        size: row["size (array)"]
          ? row["size (array)"].split(",").map((s: string) => s.trim())
          : [],
        colors: Array.isArray(row["colors (array)"])
          ? row["colors (array)"]
          : typeof row["colors (array)"] === "string"
          ? row["colors (array)"].split(",").map((c: string) => c.trim())
          : [],
        isAvailable:
          row["isAvailable"] === "TRUE" || row["isAvailable"] === true,
        isFeatured: row["isFeatured"] === "TRUE" || row["isFeatured"] === true,
        bestSeller: row["bestSeller"] === "TRUE" || row["bestSeller"] === true,
        isDeleted: false,
      };
    });

    // Insert into MongoDB
    await Product.deleteMany({});
    console.log("🗑️ Existing products deleted.");
    const result = await Product.insertMany(products);
    console.log(`Successfully imported ${result.length} products`);
  } catch (error) {
    console.error("Error importing products:", error);
  } finally {
    mongoose.connection.close();
  }
}

// Run the script
const excelFilePath = path.join(__dirname, "../data/sap-cua-me.xlsx");
if (!excelFilePath) {
  console.error("Please provide the path to the Excel file");
  process.exit(1);
}

importProducts(excelFilePath);
