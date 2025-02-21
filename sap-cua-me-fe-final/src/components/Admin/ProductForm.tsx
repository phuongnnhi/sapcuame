"use client";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  TextField, Button, Container, MenuItem, Select, FormControl, InputLabel,
  Box, Typography, Switch,
} from "@mui/material";
import { useDropzone } from "react-dropzone";

const categories = [
  "chăm sóc tóc",
  "chăm sóc da",
  "trang điểm",
  "chăm sóc cơ thể",
  "nội y",
  "chăm sóc móng",
];

interface ProductFormProps {
    initialData?: Partial<ProductForm>; // For editing
    onSubmit: (data: FormData) => Promise<void>; // Common submit handler
    isEditing?: boolean; // Flag for edit mode
  }
  

interface ProductForm {
  name: string;
  description: string;
  productType: string;
  brand: string;
  category: string[];
  tags?: string;
  price: number;
  size?: string;
  colors?: string;
  isAvailable: boolean;
}

const ProductForm: React.FC<ProductFormProps> = ({ initialData, onSubmit, isEditing = false }) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ProductForm>({
    defaultValues: {
      name: "",
      description: "",
      productType: "",
      brand: "",
      category: [],
      tags: "",
      price: 0,
      size: "",
      colors: "",
      isAvailable: true,
      ...initialData,
    },
  });

  // We'll store File objects here
  const [files, setFiles] = useState<File[]>([]);

  // We'll store the local preview URLs for images here
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      // Create preview URLs
      const newPreviews = acceptedFiles.map((file) =>
        URL.createObjectURL(file)
      );
      setImagePreviews((prev) => [...prev, ...newPreviews]);

      // Store the actual files
      setFiles((prev) => [...prev, ...acceptedFiles]);
    },
    accept: { "image/*": [] },
    multiple: true,
  });

  const removeImage = (index: number) => {
    // Remove preview
    const updatedPreviews = imagePreviews.filter((_, i) => i !== index);
    setImagePreviews(updatedPreviews);

    // Remove file
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
  };

  const handleFormSubmit = async (data: ProductForm) => {
    // Build FormData to send both text fields and files
    const formData = new FormData();

    // Append text fields
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("productType", data.productType);
    formData.append("brand", data.brand);

    // For an array field like category, append each item
    data.category.forEach((cat) => {
      formData.append("category[]", cat);
    });

    formData.append("price", data.price.toString());
    formData.append("isAvailable", data.isAvailable.toString());

    // Tags
    if (data.tags?.trim()) {
      formData.append("tags[]", data.tags);
    }

    // Size
    if (data.size?.trim()) {
      formData.append("size", data.size);
    }

    // Colors
    if (data.colors?.trim()) {
      formData.append("colors", data.colors);
    }

    // Append images (the File objects)
    files.forEach((file) => {
      formData.append("images", file);
    });

    // Debug info
    console.log("Submitting via FormData:", {
      ...data,
      files: files.map((f) => f.name),
    });

    await onSubmit(formData);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
      {isEditing ? "Edit Product" : "Add New Product"}
      </Typography>

      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <TextField
          label="Product Name"
          {...register("name", { required: "Product Name is required" })}
          fullWidth
          margin="normal"
          error={!!errors.name}
          helperText={errors.name?.message}
        />

        <TextField
          label="Description"
          {...register("description", { required: "Description is required" })}
          multiline
          rows={3}
          fullWidth
          margin="normal"
          error={!!errors.description}
          helperText={errors.description?.message}
        />

        <TextField
          label="Product Type"
          {...register("productType", { required: "Product Type is required" })}
          fullWidth
          margin="normal"
          error={!!errors.productType}
          helperText={errors.productType?.message}
        />

        <TextField
          label="Brand"
          {...register("brand", { required: "Brand is required" })}
          fullWidth
          margin="normal"
          error={!!errors.brand}
          helperText={errors.brand?.message}
        />

        <FormControl fullWidth margin="normal">
          <InputLabel>Category</InputLabel>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <Select multiple {...field}>
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>

        <TextField
          label="Price"
          {...register("price", {
            required: "Price is required",
            valueAsNumber: true,
          })}
          type="number"
          fullWidth
          margin="normal"
          error={!!errors.price}
          helperText={errors.price?.message}
        />

        <TextField
          label="Tags (comma-separated)"
          {...register("tags")}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Size (comma-separated)"
          {...register("size")}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Colors (comma-separated)"
          {...register("colors")}
          fullWidth
          margin="normal"
        />

        <FormControl margin="normal">
          <Typography>Available</Typography>
          <Controller
            name="isAvailable"
            control={control}
            render={({ field }) => <Switch {...field} checked={field.value} />}
          />
        </FormControl>

        <Box
          {...getRootProps()}
          sx={{
            border: "2px dashed #ccc",
            padding: 4,
            textAlign: "center",
            marginTop: 3,
            cursor: "pointer",
          }}
        >
          <input {...getInputProps()} />
          <Typography>Drag & drop images or click to select</Typography>
        </Box>

        <Box display="flex" gap={2} mt={2} flexWrap="wrap">
          {imagePreviews.map((img, index) => (
            <Box key={index} position="relative">
              <img
                src={img}
                alt="Preview"
                style={{ width: 100, height: 100, objectFit: "cover" }}
              />
              <Button
                onClick={() => removeImage(index)}
                variant="contained"
                color="secondary"
                sx={{ mt: 1 }}
              >
                Remove
              </Button>
            </Box>
          ))}
        </Box>

        <Button type="submit" variant="contained" color="primary" sx={{ mt: 3 }}>
        {isEditing ? "Update Product" : "Add Product"}
        </Button>
      </form>
    </Container>
  );
};

export default ProductForm;