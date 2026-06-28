public class lab7_bai3 {
    
    // Hàm tính toán đổi từ độ C sang độ F
    public static double doiNhietDo(double doC) {
        return doC * 9 / 5 + 32;
    }

    public static void main(String[] args) {
        System.out.println("--- BẢNG CHUYỂN ĐỔI NHIỆT ĐỘ ---");
        
        // Mảng chứa các giá trị độ C cần đổi theo đề bài
        double[] danhSachDoC = {0, 20, 37, 100};
        
        // Dùng vòng lặp duyệt qua từng nhiệt độ để in ra
        for (int viTri = 0; viTri < danhSachDoC.length; viTri++) {
            double doC = danhSachDoC[viTri];
            double doF = doiNhietDo(doC); // Gọi hàm để tính độ F
            
            System.out.println(doC + " độ C = " + doF + " độ F");
        }
    }
}