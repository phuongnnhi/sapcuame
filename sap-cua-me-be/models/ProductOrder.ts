import mongoose, { Schema, Document } from 'mongoose';

export interface IProductOrder extends Document {
  productId: mongoose.Schema.Types.ObjectId;
  orderId: mongoose.Schema.Types.ObjectId;
  quantity: number;
}

const ProductOrderSchema: Schema = new Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    quantity: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IProductOrder>('ProductOrder', ProductOrderSchema);