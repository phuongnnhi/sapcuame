import mongoose, { Schema, Document } from 'mongoose';

export interface IRating extends Document {
  star: number;
  review: string;
  productId: mongoose.Schema.Types.ObjectId;
  userId: mongoose.Schema.Types.ObjectId;
  isDeleted: boolean;
  createdAt: Date;
}

const RatingSchema: Schema = new Schema(
  {
    star: { type: Number, required: true, min: 1, max: 5 },
    review: { type: String, required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    isDeleted: {type: Boolean, default: false}
  },
  { timestamps: true }
);

export default mongoose.model<IRating>('Rating', RatingSchema);