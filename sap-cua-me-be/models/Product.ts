import mongoose, {Schema, Document} from 'mongoose';

export interface IProduct extends Document {
    name: string;
    description: string;
    image: string;
    productType: string;
    brand: string;
    category: Array<'chăm sóc tóc' | 'chăm sóc da' | 'trang điểm' | 'chăm sóc cơ thể' | 'nội y' | 'chăm sóc móng' >;
    tags: string[];
    price: number;
    size?: string[];
    colors?: string[];
    isAvailable: boolean;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const ProductSchema: Schema = new Schema(
    {
      name: { type: String, required: true },
      description: { type: String, required: true },
      image: { type: String, required: false },
      productType: { type: String, required: true },
      brand: { type: String, required: true },
      category: {
        type: [String], 
        enum: [
          'chăm sóc tóc',
          'chăm sóc da',
          'trang điểm',
          'chăm sóc cơ thể',
          'nội y',
          'chăm sóc móng'
        ],
        required: true,
      },
      tags: [{ type: String }],
      price: { type: Number, required: true },
      size: [{ type: String }],
      colors: [{ type: String }],
      isAvailable: { type: Boolean, default: true },
      isDeleted: {type: Boolean, default: false}
    },
    { timestamps: true } // Automatically adds createdAt and updatedAt fields
  );
  
  export default mongoose.model<IProduct>('Product', ProductSchema);