"use client";

import { useEffect, useState } from "react";
import { getUserOrders, cancelOrder } from "@/app/apiFunctions";
import { Box, Text, VStack, Spinner, Separator, Button, Flex } from "@chakra-ui/react";
import { Order, ProductOrder } from "@/types";

const OrderPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [productOrdersMap, setProductOrdersMap] = useState<{ [key: string]: ProductOrder[] }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersData = await getUserOrders(currentPage, ordersPerPage);
        console.log("API Response (ordersData):", ordersData);

        setOrders(ordersData.orders);
        setTotalPages(ordersData.totalPages);

        const productOrdersData: { [key: string]: ProductOrder[] } = {};
        ordersData.orders.forEach((order) => {
          productOrdersData[order._id] = order.productOrders || [];
        });

        setProductOrdersMap(productOrdersData);
      } catch (err) {
        console.error("Error in fetchOrders:", err);
        setError("Không thể tải đơn hàng.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [currentPage]); // Re-fetch when page changes

  // Cancel Order Function
  const handleCancelOrder = async (orderId: string) => {
    try {
      await cancelOrder(orderId);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: "Đã hủy" } : order
        )
      );
    } catch (error) {
      console.error("Lỗi khi hủy đơn hàng:", error);
    }
  };

  return (
    <Box maxWidth="600x" mx="auto" p="4">
      <Text fontSize="2xl" fontWeight="bold" mb="4" color="brand.500">
        Đơn hàng của bạn
      </Text>

      {loading ? (
        <Spinner size="xl" />
      ) : error ? (
        <Text color="red.500">{error}</Text>
      ) : orders.length > 0 ? (
        <VStack gap={6} align="stretch">
          {orders.map((order) => (
            <Box key={order._id} borderWidth="1px" borderRadius="md" p="4">
              <Text fontSize="md" fontWeight="bold" mb="2">
                Mã đơn: {order._id}
              </Text>

              {productOrdersMap[order._id]?.length > 0 ? (
                productOrdersMap[order._id].map((productOrder) => (
                  <Text key={productOrder._id}>
                    {productOrder.productId.name} (Số lượng: {productOrder.quantity}, Giá{" "}
                    {productOrder.productId.price.toLocaleString()} VND)
                  </Text>
                ))
              ) : (
                <Text color="gray.500">Không có sản phẩm trong đơn này.</Text>
              )}

              <Separator size="sm" width="100%" orientation="horizontal" />

              <Text fontWeight="bold">
                Tổng tiền: {order.totalCost.toLocaleString()} VND
              </Text>
              <Text>Trạng thái: {order.status}</Text>

              {/* Cancel Button (Only if the order is eligible for cancellation) */}
              {["Mới tạo", "Chờ xác nhận", "Đã xác nhận", "Đang chuẩn bị hàng"].includes(order.status) && (
                <Button mt={2} colorScheme="red" size="sm" onClick={() => handleCancelOrder(order._id)}>
                  Hủy đơn hàng
                </Button>
              )}
            </Box>
          ))}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <Flex justify="center" mt={4} gap={2}>
              <Button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Trước
              </Button>
              <Text>
                Trang {currentPage} / {totalPages}
              </Text>
              <Button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Tiếp
              </Button>
            </Flex>
          )}
        </VStack>
      ) : (
        <Text>Không có đơn hàng.</Text>
      )}
    </Box>
  );
};

export default OrderPage;