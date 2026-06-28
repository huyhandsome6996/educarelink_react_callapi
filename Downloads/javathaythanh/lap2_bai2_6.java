public class lap2_bai2_6 {
    public static void main(String[] args) {
        // Khai báo và khởi tạo 3 biến số nguyên
        // Hàm tìm và in ra số nhỏ nhất dùng toán tử ba ngôi
        int a = 15;
        int b = 8;
        int c = 20;
        int min = (a < b) ? ((a < c) ? a : c) : ((b < c) ? b : c);
        // Cấu trúc: (điều kiện) ? giá trị_nếu_đúng : giá trị_nếu_sai
        // Bước 1: So sánh a với b để tìm số nhỏ hơn
        // Bước 2: Lấy số nhỏ hơn đó so sánh tiếp với c
        System.out.println(min);
        
    }
}
