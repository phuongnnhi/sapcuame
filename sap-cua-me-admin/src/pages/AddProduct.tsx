import React, { useState } from 'react';
import { TextField, Button, Container, MenuItem, Select, FormControl, InputLabel, Box, Typography, Switch, SelectChangeEvent } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { addProduct } from '../app/apiFunctions';

const categories = [
  'chăm sóc tóc',
  'chăm sóc da',
  'trang điểm',
  'chăm sóc cơ thể',
  'nội y',
  'chăm sóc móng'
];

const AddProduct: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    productType: '',
    brand: '',
    category: [] as string[],
    tags: [] as string[],
    price: '',
    size: [] as string[],
    colors: [] as string[],
    isAvailable: true,
  });

  const [image, setImage] = useState<File | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCategoryChange = (event: SelectChangeEvent<string[]>) => {
    setFormData({ ...formData, category: event.target.value as string[] });
};

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, tags: e.target.value.split(',') });
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setImage(acceptedFiles[0]);
    },
    accept: { 'image/*': [] },
    multiple: true,
  });

  const handleSubmit = async () => {
    const form = new FormData();
    
    // Ensure required fields are appended
    form.append('name', formData.name || '');
    form.append('description', formData.description || '');
    form.append('productType', formData.productType || '');
    form.append('brand', formData.brand || '');
    
    // Append category correctly as an array
    if (formData.category.length > 0) {
        formData.category.forEach((cat) => form.append('category[]', cat));
    } else {
        form.append('category[]', '');  // Prevent empty category
    }

    // Append tags correctly as an array
    if (formData.tags.length > 0) {
        formData.tags.forEach((tag) => form.append('tags[]', tag));
    } else {
        form.append('tags[]', '');  // Prevent empty tags
    }

    // Append price with correct formatting
    form.append('price', formData.price ? formData.price.toString() : '0');

    // Handle optional fields: size and colors
    if (formData.size.length > 0) {
        formData.size.forEach((size) => form.append('size[]', size));
    }

    if (formData.colors.length > 0) {
        formData.colors.forEach((color) => form.append('colors[]', color));
    }

    // Handle boolean fields as strings
    form.append('isAvailable', formData.isAvailable ? 'true' : 'false');

    // Handle image upload
    if (image) {
        form.append('image', image);
    }

    try {
        await addProduct(form);
        alert('Product added successfully!');
    } catch (error) {
        console.error('Error adding product:', error);
    }
};

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Add New Product
      </Typography>

      <TextField label="Product Name" name="name" fullWidth margin="normal" onChange={handleInputChange} required />

      <TextField
        label="Description"
        name="description"
        multiline
        rows={3}
        fullWidth
        margin="normal"
        onChange={handleInputChange}
        required
      />

      <TextField label="Product Type" name="productType" fullWidth margin="normal" onChange={handleInputChange} required />

      <TextField label="Brand" name="brand" fullWidth margin="normal" onChange={handleInputChange} required />

      <FormControl fullWidth margin="normal">
        <InputLabel>Category</InputLabel>
        <Select multiple value={formData.category} onChange={handleCategoryChange}>
          {categories.map((cat) => (
            <MenuItem key={cat} value={cat}>
              {cat}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField label="Tags (comma-separated)" name="tags" fullWidth margin="normal" onChange={handleTagsChange} />

      <TextField label="Price" name="price" type="number" fullWidth margin="normal" onChange={handleInputChange} required />

      <TextField label="Size (comma-separated)" name="size" fullWidth margin="normal" onChange={handleTagsChange} />

      <TextField label="Colors (comma-separated)" name="colors" fullWidth margin="normal" onChange={handleTagsChange} />

      <FormControl margin="normal">
        <Typography>Available</Typography>
        <Switch
          checked={formData.isAvailable}
          onChange={(e) => setFormData({ ...formData, isAvailable: e.target.checked })}
        />
      </FormControl>

      <Box
        {...getRootProps()}
        sx={{
          border: '2px dashed #ccc',
          padding: 4,
          textAlign: 'center',
          marginTop: 3,
          cursor: 'pointer',
        }}
      >
        <input {...getInputProps()} />
        {image ? <Typography>{image.name}</Typography> : <Typography>Drag & drop an image or click to select</Typography>}
      </Box>

      <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mt: 3 }}>
        Add Product
      </Button>
    </Container>
  );
};

export default AddProduct;