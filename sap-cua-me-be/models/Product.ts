import mongoose, {Schema, Document} from 'mongoose';

interface Variety {
  name: string;
  price: number;
}

export interface IProduct extends Document {
    name: string;
    description: string;
    images: string[]; 
    productType: string;
    brand: string;
    category: Array<'chăm sóc tóc' | 'chăm sóc da' | 'trang điểm' | 'chăm sóc cơ thể' | 'nội y' | 'chăm sóc móng' >;
    tags: string[];
    price: number;
    size?: string[];
    colors?: string[];
    isAvailable: boolean;
    isFeatured: boolean;
    bestSeller: boolean;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const VarietySchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true }
});


const ProductSchema: Schema = new Schema(
    {
      name: { type: String, required: true },
      description: { type: String, required: true },
      images: [{ type: String, required: false }],
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
      varieties: {
        type: [VarietySchema], // Use the VarietySchema here
        required: false,
      },
      price: { type: Number, required: true },
      size: [{ type: String }],
      colors: [{ type: String }],
      isAvailable: { type: Boolean, default: true },
      isFeatured: {type:Boolean, default: false},
      bestSeller: {type: Boolean, default: false},
      isDeleted: {type: Boolean, default: false}
    },
    { timestamps: true } // Automatically adds createdAt and updatedAt fields
  );
  
  export default mongoose.model<IProduct>('Product', ProductSchema);