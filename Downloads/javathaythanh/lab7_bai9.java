public class lab7_bai9 {
    
    // Hàm 1: Chỉ làm nhiệm vụ tính toán số tiền
    public static double tinhThanhTien(double donGia, int soLuong) {
        return donGia * soLuong;
    }

    // Hàm 2: Làm nhiệm vụ in ra màn hình (void)
    public static void inHoaDon(String tenSanPham, double donGia, int soLuong) {
        // Gọi lại Hàm 1 ở trên để lấy số tiền
        double thanhTien = tinhThanhTien(donGia, soLuong);
        
        System.out.println("Tên sản phẩm: " + tenSanPham);
        System.out.println("Đơn giá: " + donGia + " - Số lượng: " + soLuong);
        System.out.println("Tổng thành tiền: " + thanhTien);
        System.out.println("-------------------------");
    }

    public static void main(String[] args) {
        System.out.println("=== HÓA ĐƠN MUA HÀNG CỦA BẠN ===");
        System.out.println("-------------------------");
        
        // Gọi hàm in hóa đơn 3 lần cho 3 món hàng khác nhau
        inHoaDon("Bút bi thiên long", 5000, 10);
        inHoaDon("Vở kẻ ngang", 12000, 5);
        inHoaDon("Balo đi học", 250000, 1);
    }
}