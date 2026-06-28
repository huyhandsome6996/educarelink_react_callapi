public class lap2_bai2_7 {
    // Hàm giải phương trình bậc 2: ax^2 + bx + c = 0
    public static void giaiPT(int a, int b, int c) {
        System.out.println("Phương trình: " + a + "x^2 + " + b + "x + " + c + " = 0");

        // Trường hợp 1: a = 0 (Trở thành phương trình bậc 1: bx + c = 0)
        if (a == 0) {
            if (b == 0) {
                if (c == 0) {
                    System.out.println("=> Phương trình vô số nghiệm.");
                } else {
                    System.out.println("=> Phương trình vô nghiệm.");
                }
            } else {
                double x = (double) -c / b;
                System.out.println("=> Phương trình có 1 nghiệm: x = " + x);
            }
        } 
        // Trường hợp 2: a != 0
        else {
            double delta = b * b - 4 * a * c;
            System.out.println("Delta = " + delta);

            if (delta < 0) {
                System.out.println("=> Phương trình vô nghiệm (Delta < 0).");
            } else if (delta == 0) {
                double x = (double) -b / (2 * a);
                System.out.println("=> Phương trình có nghiệm kép: x1 = x2 = " + x);
            } else {
                double x1 = (-b + Math.sqrt(delta)) / (2 * a);
                double x2 = (-b - Math.sqrt(delta)) / (2 * a);
                System.out.println("=> Phương trình có 2 nghiệm phân biệt:");
                System.out.println("   x1 = " + x1);
                System.out.println("   x2 = " + x2);
            }
        }
        System.out.println("------------------------------------");
    }

    public static void main(String[] args) {
        // Test các trường hợp
        giaiPT(0, 0, 5);    // Vô nghiệm (a=0, b=0, c!=0)
        giaiPT(1, -3, 2);  // 2 nghiệm phân biệt (Delta > 0)
        giaiPT(1, 2, 1);   // Nghiệm kép (Delta = 0)
        giaiPT(1, 1, 1);   // Vô nghiệm (Delta < 0)
    }
}
