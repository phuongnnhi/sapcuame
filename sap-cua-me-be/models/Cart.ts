import mongoose, { Schema, Document } from 'mongoose';
import { IProduct } from './Product';
import { IProductCart } from './ProductCart';


export interface ICart extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  productCarts?: IProductCart[];
  addedAt: Date;
}

const CartSchema: Schema = new Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    
    addedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Define a virtual field to fetch products from ProductCart
CartSchema.virtual('productCarts', {
  ref: 'ProductCart',        // Reference the ProductCart model
  localField: '_id',         // This field in Cart
  foreignField: 'cartId',    // Matches with cartId in ProductCart
  justOne: false             // Set false to get an array (many-to-many)
});


// Enable virtuals in JSON and Object responses
CartSchema.set('toJSON', { virtuals: true });
CartSchema.set('toObject', { virtuals: true });

export default mongoose.model<ICart>('Cart', CartSchema);