import mongoose, { Schema, Document } from 'mongoose';

export interface ICart extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  products: mongoose.Schema.Types.ObjectId[];
  addedAt: Date;
}

const CartSchema: Schema = new Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ProductCart' }],
    addedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model<ICart>('Cart', CartSchema);