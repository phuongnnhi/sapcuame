import { Order, OrderResponse } from "@/components/Admin/OrderBoard/types";
import apiService from "./apiServices";
import { Cart, Product, ProductResponse } from "@/types";

// Get all orders
export const getAllOrders = async (): Promise<OrderResponse> => {
  try {
    const response = await apiService.get<OrderResponse>("/order/admin/all");
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};

// Get order by ID
export const getOrderById = async (orderId: string): Promise<Order> => {
  try {
    const response = await apiService.get<Order>(`/order/${orderId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching order ${orderId}:`, error);
    throw error;
  }
};

// Update order status
export const updateOrderStatus = async (
  orderId: string,
  status: Order["status"]
): Promise<Order> => {
  try {
    const response = await apiService.put<Order>(`/order/${orderId}`, {
      status,
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating order status for ${orderId}:`, error);
    throw error;
  }
};

// Get all products with pagination, search, and filters
export const getProducts = async (
  params?: Record<string, any>
): Promise<ProductResponse> => {
  try {
    const response = await apiService.get<ProductResponse>("/product", {
      params,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

//Get featured products
export const getFeaturedProducts = async (): Promise<ProductResponse> => {
  try {
    const response = await apiService.get<ProductResponse>("/product/featured");
    return response.data;
  } catch (error) {
    console.error("Error fetching featured products:", error);
    throw error;
  }
};

//Get Best Seller Products
export const getBestSellerProducts = async (): Promise<ProductResponse> => {
  try {
    const response = await apiService.get<ProductResponse>(
      "/product/bestseller"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching best-seller products:", error);
    throw error;
  }
};

// Get product by ID
export const getProductById = async (productId: string): Promise<Product> => {
  try {
    const response = await apiService.get<Product>(`/product/${productId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product ${productId}:`, error);
    throw error;
  }
};

// Add a new product
export const addProduct = async (productData: FormData): Promise<Product> => {
  try {
    const response = await apiService.post<Product>("/product", productData);
    return response.data;
  } catch (error) {
    console.error("Error adding new product:", error);
    throw error;
  }
};

// Update a product
export const updateProduct = async (
  productId: string,
  productData: FormData
): Promise<Product> => {
  try {
    const response = await apiService.put<Product>(
      `/product/${productId}`,
      productData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

// Delete a product by ID
export const deleteProduct = async (productId: string): Promise<void> => {
  try {
    await apiService.delete(`/product/${productId}`);
  } catch (error) {
    console.error(`Error deleting product ${productId}:`, error);
    throw error;
  }
};


//CART API 
// Add product to cart
export const addToCart = async (productId: string, quantity: number): Promise<Cart> => {
  try {
    const response = await apiService.post<Cart>("/cart", { productId, quantity });
    return response.data;
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw error;
  }
};

// Get user cart
export const getCart = async (): Promise<Cart> => {
  try {
    const response = await apiService.get<Cart>("/cart");
    return response.data;
  } catch (error) {
    console.error("Error fetching cart:", error);
    throw error;
  }
};

// Remove an item from cart
export const removeCartItem = async (cartItemId: string): Promise<void> => {
  try {
    await apiService.delete(`/cart/${cartItemId}`);
  } catch (error) {
    console.error("Error removing cart item:", error);
    throw error;
  }
};

// Update cart item quantity
export const updateCartItem = async (cartItemId: string, quantity: number): Promise<Cart> => {
  try {
    const response = await apiService.put<Cart>(`/cart/${cartItemId}`, { quantity });
    return response.data;
  } catch (error) {
    console.error("Error updating cart item:", error);
    throw error;
  }
};