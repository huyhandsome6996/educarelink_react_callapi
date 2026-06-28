public class lap3_bai8 {
    public static void main(String[] args) {
        // Vẽ chữ H trên lưới 5x5
        for (int i = 1; i <= 5; i++) {       // Duyệt 5 hàng
            for (int j = 1; j <= 5; j++) {   // Duyệt 5 cột
                
                // In '*' nếu là cột đầu tiên, cột cuối cùng, hoặc thanh ngang ở giữa
                if (j == 1 || j == 5 || i == 3) {
                    System.out.print("* ");
                } else {
                    System.out.print("  "); // Rỗng ở giữa
                }
            }
            System.out.println(); // Xong 1 hàng thì xuống dòng
        }
    }
}
