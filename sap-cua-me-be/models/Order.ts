import mongoose, { Schema, Document } from 'mongoose';

export interface IOrder extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
  status:
    | 'Mới tạo'
    | 'Chờ xác nhận'
    | 'Đã xác nhận'
    | 'Đang chuẩn bị hàng'
    | 'Đang giao hàng'
    | 'Đã giao hàng'
    | 'Đã hoàn thành'
    | 'Đã hủy'
    | 'Hoàn trả'
    | 'Đã hoàn tiền';
  totalCost: number;
}

const OrderSchema: Schema = new Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: {
      type: String,
      enum: [
        'Mới tạo',
        'Chờ xác nhận',
        'Đã xác nhận',
        'Đang chuẩn bị hàng',
        'Đang giao hàng',
        'Đã giao hàng',
        'Đã hoàn thành',
        'Đã hủy',
        'Hoàn trả',
        'Đã hoàn tiền',
      ],
      default: 'Mới tạo',
    },
    totalCost: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IOrder>('Order', OrderSchema);