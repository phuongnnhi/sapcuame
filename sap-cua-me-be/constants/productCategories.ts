export const PRODUCT_CATEGORIES = [          'chăm sóc tóc',
    'chăm sóc da',
    'trang điểm',
    'chăm sóc cơ thể',
    'nội y',
    'chăm sóc móng'];

// Define valid order statuses
export const ORDER_STATUSES = [
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

    // Utility function to preprocess search input and product fields
    export const preprocessText = (str: string): string => {
      return str
        .trim()
        .toLowerCase()
        .normalize('NFD') // Decompose diacritics
        .replace(/[\u0300-\u036f]/g, '') // Remove diacritic marks
        .replace(/đ/g, 'd') // Replace 'đ' with 'd'
        .replace(/\s+/g, '') // Remove all spaces
        .replace(/\u200B/g, ''); // Remove zero-width spaces
    };