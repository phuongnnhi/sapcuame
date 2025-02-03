import mongoose, { Schema, Document } from 'mongoose';

export interface IProductCart extends Document {
  _id: mongoose.Schema.Types.ObjectId;
  productId: mongoose.Schema.Types.ObjectId;
  cartId: mongoose.Schema.Types.ObjectId;
  quantity: number;
}

const ProductCartSchema: Schema = new Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    cartId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart', required: true },
    quantity: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IProductCart>('ProductCart', ProductCartSchema);