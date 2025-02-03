import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  _id: mongoose.Schema.Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  address: string;
  passwordHash: string;
  role: string;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  address: { type: String },
  passwordHash: { type: String, required: true },
  role: { type: String, default: 'user', enum: ['user', 'admin'], required: true }
});

export default mongoose.model<IUser>('User', UserSchema);