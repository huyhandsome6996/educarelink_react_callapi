import java.util.Scanner;

public class lap3_bai5 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n;

        // 1. Ép nhập số dương
        do {
            n = sc.nextInt();
        } while (n <= 0); // Nhớ có dấu chấm phẩy (;) ở đây

        // 2. In ước số
        for (int i = 1; i <= n; i++) {
            if (n % i == 0) { 
                System.out.print(i + " ");
            }
        }
    }
}