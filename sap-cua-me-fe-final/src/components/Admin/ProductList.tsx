"use client";
import React, { useEffect, useState, useCallback } from "react";
import {
  getProducts,
  deleteProduct,
  updateProduct,
} from "../../app/apiFunctions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  TextField,
  Select,
  MenuItem,
  Container,
  Typography,
  Box,
  Pagination,
  SelectChangeEvent,
} from "@mui/material";
import { useRouter } from "next/navigation";

// Define the Product interface
interface Product {
  _id: string;
  name: string;
  description: string;
  images?: string[];
  productType: string;
  brand: string;
  category: string[];
  tags?: string[];
  price: number;
  isAvailable: boolean;
  isDeleted: boolean;
}

// Define the response structure for products
interface ProductResponse {
  products: Product[];
  total: number;
}

// Category options
const categories = [
  "chăm sóc tóc",
  "chăm sóc da",
  "trang điểm",
  "chăm sóc cơ thể",
  "nội y",
  "chăm sóc móng",
];

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const router = useRouter();

  const limit = 10; // Items per page

  // Fetch products with correct typing
  const fetchProducts = useCallback(async () => {
    try {
      const params = {
        search: searchTerm,
        category: selectedCategory || undefined,
        page,
        limit,
      };

      const response: ProductResponse = await getProducts(params);
      setProducts(response.products);
      setTotalPages(Math.ceil(response.total / limit));
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }, [searchTerm, selectedCategory, page]);

  // Fetch products when dependencies change
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Handle search input change
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  // Handle category selection change
  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    setSelectedCategory(event.target.value as string);
    setPage(1);
  };

  // Handle pagination change
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  // Handle product deletion
  const handleDelete = async (productId: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(productId);
        fetchProducts(); // Refresh list after deletion
        alert("Product deleted successfully");
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  return (
    <Container>
      <Typography variant="h4" sx={{color:"black"}} gutterBottom>
        Danh sách sản phẩm
      </Typography>

      <Box display="flex" gap={2} mb={3}>
        <TextField
          label="Search by Name or ID"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={handleSearch}
        />
        <Select
          value={selectedCategory}
          onChange={handleCategoryChange}
          displayEmpty
          variant="outlined"
        >
          <MenuItem value="">All Categories</MenuItem>
          {categories.map((cat) => (
            <MenuItem key={cat} value={cat}>
              {cat}
            </MenuItem>
          ))}
        </Select>
      </Box>

      <Button
        variant="contained"
        color="primary"
        size="small"
        onClick={() => router.push(`/admin/products/addproduct`)}
      >
        Thêm sản phẩm mới
      </Button>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Hình ảnh</TableCell>
            <TableCell>Tên</TableCell>
            <TableCell>Loại sản phẩm</TableCell>
            <TableCell>Giá tiền</TableCell>
            <TableCell>Còn hàng</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product._id}>
              <TableCell>
                <img
                  src={
                    Array.isArray(product.images) && product.images.length > 0
                      ? product.images[0] // first image URL
                      : "placeholder.jpg" // fallback
                  }
                  alt={product.name}
                  width="50"
                />
              </TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.category.join(", ")}</TableCell>
              <TableCell>{product.price.toLocaleString()} VND</TableCell>
              <TableCell>{product.isAvailable ? "Yes" : "No"}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={() => router.push(`/admin/products/${product._id}/edit`)}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  onClick={() => handleDelete(product._id)}
                  sx={{ ml: 1 }}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Box display="flex" justifyContent="center" mt={3}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Container>
  );
};

export default ProductList;
