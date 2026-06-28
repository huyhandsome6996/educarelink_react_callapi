public class lab7_bai6 {
    
    // Hàm tính số tiền cuối cùng phải trả sau khi giảm giá
    public static double tinhGiamGia(double gia, int soLuong) {
        double tongTienBanDau = gia * soLuong;
        double phanTramGiam = 0.0;

        // Xét số lượng từ cao xuống thấp để lấy mức giảm giá phù hợp
        if (soLuong >= 50) {
            phanTramGiam = 0.15; // Giảm 15%
        } else if (soLuong >= 20) {
            phanTramGiam = 0.10; // Giảm 10%
        } else if (soLuong >= 10) {
            phanTramGiam = 0.05; // Giảm 5%
        } else {
            phanTramGiam = 0.0;  // Không giảm
        }

        double tienDuocGiam = tongTienBanDau * phanTramGiam;
        double tienPhaiTra = tongTienBanDau - tienDuocGiam;
        
        return tienPhaiTra;
    }

    public static void main(String[] args) {
        System.out.println("--- KIỂM TRA TÍNH GIẢM GIÁ ---");
        
        System.out.println("Mua 5 cái (Giá 100k): Phải trả " + tinhGiamGia(100000, 5));
        System.out.println("Mua 15 cái (Giá 100k): Phải trả " + tinhGiamGia(100000, 15));
        System.out.println("Mua 25 cái (Giá 100k): Phải trả " + tinhGiamGia(100000, 25));
        System.out.println("Mua 60 cái (Giá 100k): Phải trả " + tinhGiamGia(100000, 60));
    }
}