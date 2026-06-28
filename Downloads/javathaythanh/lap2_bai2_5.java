public class lap2_bai2_5 {
    // Hàm public static để kiểm tra và trả về Quý
    public static void inKetQuaQuy(int thang) {
        String ketQua = "";
        
        switch (thang) {
            case 1: case 2: case 3:
                ketQua = "Quý 1 (Q1)";
                break;
            case 4: case 5: case 6:
                ketQua = "Quý 2 (Q2)";
                break;
            case 7: case 8: case 9:
                ketQua = "Quý 3 (Q3)";
                break;
            case 10: case 11: case 12:
                ketQua = "Quý 4 (Q4)";
                break;
            default:
                ketQua = "Không hợp lệ (Tháng phải từ 1-12)";
                break;
        }
        
        System.out.println("Tháng " + thang + " thuộc: " + ketQua);
    }

    public static void main(String[] args) {
        // Khai báo và khởi tạo biến tháng
        int thangHuyNhap = 5; 

        // Gọi hàm đã tạo ở trên
        inKetQuaQuy(thangHuyNhap);
        
        // Thử thêm một vài tháng khác để kiểm tra
        inKetQuaQuy(10);
        inKetQuaQuy(13); 
    }
/* if-else duyệt từ trên xuống dưới.
   - Còn switch-case chỉ cần biến vào trùng với case là trả về kết quả luôn,
   ko cần hỏi từng nhà một.
   - Switch hoạt động với int, char, String, enum. ko dùng được với double, float, long
 */
}
