import { Request, Response } from "express";
import Order from "../../models/Order";

export const updateOrderStatus = async(req: Request, res:Response) => {
    try {
        const {id} = req.params;
        const {status} = req.body;

        const allowedStatuses = [
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
          ];

          //check if status is valid
          if (!allowedStatuses.includes(status)) {
            res.status(400).json({ message: 'Invalid order status' });
            return;
          }

              // Update the order status
    const updatedOrder = await Order.findByIdAndUpdate(
        id,
        { status },
        { new: true, runValidators: true }
      );
  
      // Check if the order exists
      if (!updatedOrder) {
        res.status(404).json({ message: 'Order not found' });
        return;
      }

      res.status(200).json({
        message: 'Order status updated successfully',
        order: updatedOrder,
      });
  
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}