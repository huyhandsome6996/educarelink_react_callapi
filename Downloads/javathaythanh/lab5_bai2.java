import java.util.Scanner;

public class lab5_bai2 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        // ======================================================
        // BÀI 2.1: XỬ LÝ MẢNG CHO SẴN
        // ======================================================
        System.out.println("========== BÀI 2.1 ==========");
        int[] diem = {6, 8, 5, 9, 7, 4, 10, 6, 8, 7};

        int tong = 0;
        int max = diem[0];
        int min = diem[0];
        int demKha = 0;

        for (int d : diem) {
            tong += d;
            if (d > max) max = d;
            if (d < min) min = d;
            if (d >= 7) demKha++; //đếm số sinh viên trên 7đ    
        }

        double trungBinh = (double) tong / diem.length;

        // Đã đánh dấu a, b, c rõ ràng
        System.out.println("a) Tổng: " + tong + ", Trung bình: " + trungBinh);
        System.out.println("b) Cao nhất: " + max + " | Thấp nhất: " + min);
        System.out.println("c) Số lượng điểm >= 7: " + demKha);


        // ======================================================
        // BÀI 2.2: NHẬP VÀ XỬ LÝ MẢNG TỪ BÀN PHÍM
        // ======================================================
        System.out.println("\n========== BÀI 2.2 ==========");
        System.out.print("Nhập số lượng phần tử n: ");
        int n = sc.nextInt();
        
        int[] arr = new int[n];
        
        // Nhập mảng
        for (int i = 0; i < n; i++) {
            System.out.print("Nhập phần tử arr[" + i + "]: ");
            arr[i] = sc.nextInt();
        }
        
        // Đã đánh dấu a) Đảo ngược mảng bằng 2 con trỏ
        int left = 0;           // Con trỏ đầu mảng
        int right = n - 1;      // Con trỏ cuối mảng

        while (left < right) {
            // Hoán vị (Swap) giá trị của 2 con trỏ
            int temp = arr[left];
            arr[left] = arr[right];
            arr[right] = temp;
            
            // Dịch chuyển 2 con trỏ lại gần nhau
            left+=1;
            right-=1;
        }

        // In ra mảng sau khi đã bị đảo ngược vật lý
        System.out.print("a) Mảng in ngược: ");
        for (int x : arr) {
            System.out.print(x + " ");
        }
        System.out.println();
        
        // Đã đánh dấu b) cho phần tính tổng chẵn
        int tongChan = 0;
        for (int x : arr) {
            if (x % 2 == 0) {
                tongChan += x;
            }
        }
        System.out.println("b) Tổng các số chẵn là: " + tongChan);

        // Đóng Scanner
        sc.close();
    }
}