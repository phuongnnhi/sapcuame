import { Response } from "express";
import Order from "../../models/Order";
import Cart from "../../models/Cart";
import Product from "../../models/Product";
import ProductOrder from "../../models/ProductOrder";
import ProductCart from "../../models/ProductCart";
import { IProductCart } from "../../models/ProductCart";
import { CustomRequest } from "../../index";

export const createOrder = async (req: CustomRequest, res: Response) => {
    try {
      const userId = req.user._id;
  
      // Get the user's cart
      const cart = await Cart.findOne({ userId })
  .populate<{ products: IProductCart[] }>({
    path: "products",
    model: ProductCart, // Explicitly specify the model
  });
      if (!cart || cart.products.length === 0) {
        res.status(400).json({ message: "Your cart is empty" });
        return 
      }
  
      // Declare orderedProductIds array
      const orderedProductIds: string[] = [];
  
      // Calculate total cost and prepare order items
      let totalCost = 0;
      const productOrders = await Promise.all(
        cart.products.map(async (productCart: IProductCart) => {
          const product = await Product.findById(productCart.productId);
          if (!product || !product.isAvailable || product.isDeleted) {
            throw new Error(
              `Product with ID ${productCart.productId} is unavailable`
            );
          }
  
          totalCost += product.price * productCart.quantity;
          orderedProductIds.push(productCart.productId.toString());
  
          return {
            productId: product._id,
            name: product.name,
            price: product.price,
            image: product.images,
            quantity: productCart.quantity,
          };
        })
      );
  
      // Create the order
      const order = new Order({
        userId,
        status: "Mới tạo",
        totalCost,
      });
      await order.save();
  
      // Save product orders into ProductOrder collection
      const productOrderRecords = await Promise.all(
        productOrders.map(async (item) => {
          const productOrder = new ProductOrder({
            productId: item.productId,
            orderId: order._id,
            quantity: item.quantity,
          });
          await productOrder.save();
          return productOrder;
        })
      );
  
      // Filter out ordered products from the cart
      cart.products = cart.products.filter(
        (productCart: IProductCart) =>
          !orderedProductIds.includes(productCart.productId.toString())
      );
  
      await cart.save();

      // Delete the corresponding ProductCart entries from the database
await ProductCart.deleteMany({
  _id: { $in: orderedProductIds }, // Delete ProductCart entries by their IDs
});
  
      res.status(201).json({
        message: "Order created successfully",
        order,
        productOrders: productOrders.map((item) => ({
          productId: item.productId,
          name: item.name,
          image: item.image,
          price: item.price,
          quantity: item.quantity,
          productOrderRecords
        })),
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error"});
    }
  };