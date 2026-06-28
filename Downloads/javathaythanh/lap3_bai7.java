import java.util.Scanner;

public class lap3_bai7 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int w = sc.nextInt(); // Chiều rộng
        int h = sc.nextInt(); // Chiều cao

        for (int i = 1; i <= h; i++) {       // Duyệt từng hàng
            for (int j = 1; j <= w; j++) {   // Duyệt từng cột
                
                // Nếu là hàng đầu, hàng cuối, cột đầu hoặc cột cuối -> In dấu sao
                if (i == 1 || i == h || j == 1 || j == w) {
                    System.out.print("* ");
                } else {
                    // Ngược lại in khoảng trắng (rỗng ở giữa)
                    System.out.print("  "); 
                }
            }
            System.out.println(); // Vẽ xong 1 hàng thì xuống dòng
        }
    }
}
