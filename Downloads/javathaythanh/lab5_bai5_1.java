import java.util.Scanner;

public class lab5_bai5_1 {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Nhập số lượng sinh viên: ");
        int soLuong = Integer.parseInt(scanner.nextLine());

        String[] danhSachTen = new String[soLuong];
        double[] danhSachDiem = new double[soLuong];

        // Gọi các hàm ra chạy lần lượt
        nhapDuLieu(scanner, danhSachTen, danhSachDiem, soLuong);
        
        System.out.println("\n--- DANH SÁCH BAN ĐẦU ---");
        hienThiDanhSach(danhSachTen, danhSachDiem, soLuong);
        
        sapXepGiamDan(danhSachTen, danhSachDiem, soLuong);
        
        System.out.println("\n--- DANH SÁCH SAU KHI SẮP XẾP ---");
        hienThiDanhSach(danhSachTen, danhSachDiem, soLuong);
        
        thongKeXepLoai(danhSachDiem, soLuong);
        
        timKiemSinhVien(scanner, danhSachTen, danhSachDiem, soLuong);

        scanner.close();
    }

    // ==========================================
    // 1. Hàm Nhập dữ liệu
    // ==========================================
    public static void nhapDuLieu(Scanner scanner, String[] danhSachTen, double[] danhSachDiem, int soLuong) {
        System.out.println("--- NHẬP THÔNG TIN ---");
        for (int viTri = 0; viTri < soLuong; viTri++) {
            System.out.print("Nhập họ và tên sinh viên: ");
            danhSachTen[viTri] = scanner.nextLine();
            
            System.out.print("Nhập điểm trung bình: ");
            danhSachDiem[viTri] = Double.parseDouble(scanner.nextLine());
        }
    }

    // ==========================================
    // 2. Hàm Hiển thị danh sách & Xếp loại
    // ==========================================
    public static void hienThiDanhSach(String[] danhSachTen, double[] danhSachDiem, int soLuong) {
        for (int viTri = 0; viTri < soLuong; viTri++) {
            String xepLoai = "";
            
            if (danhSachDiem[viTri] >= 8.0) {
                xepLoai = "Giỏi";
            } else if (danhSachDiem[viTri] >= 6.5) {
                xepLoai = "Khá";
            } else if (danhSachDiem[viTri] >= 5.0) {
                xepLoai = "Trung bình";
            } else {
                xepLoai = "Yếu";
            }
            
            System.out.println("Tên: " + danhSachTen[viTri] + " - Điểm: " + danhSachDiem[viTri] + " - Loại: " + xepLoai);
        }
    }

    // ==========================================
    // 3. Hàm Sắp xếp (Bubble Sort)
    // ==========================================
    public static void sapXepGiamDan(String[] danhSachTen, double[] danhSachDiem, int soLuong) {
        for (int vongLapNgoai = 0; vongLapNgoai < soLuong - 1; vongLapNgoai++) {
            for (int vongLapTrong = 0; vongLapTrong < soLuong - vongLapNgoai - 1; vongLapTrong++) {
                
                if (danhSachDiem[vongLapTrong] < danhSachDiem[vongLapTrong + 1]) {
                    // Đổi điểm
                    double diemTamThoi = danhSachDiem[vongLapTrong];
                    danhSachDiem[vongLapTrong] = danhSachDiem[vongLapTrong + 1];
                    danhSachDiem[vongLapTrong + 1] = diemTamThoi;

                    // Đổi tên
                    String tenTamThoi = danhSachTen[vongLapTrong];
                    danhSachTen[vongLapTrong] = danhSachTen[vongLapTrong + 1];
                    danhSachTen[vongLapTrong + 1] = tenTamThoi;
                }
            }
        }
    }

    // ==========================================
    // 4. Hàm Thống kê
    // ==========================================
    public static void thongKeXepLoai(double[] danhSachDiem, int soLuong) {
        int demGioi = 0;
        int demKha = 0;
        int demTrungBinh = 0;
        int demYeu = 0;

        for (int viTri = 0; viTri < soLuong; viTri++) {
            if (danhSachDiem[viTri] >= 8.0) {
                demGioi++;
            } else if (danhSachDiem[viTri] >= 6.5) {
                demKha++;
            } else if (danhSachDiem[viTri] >= 5.0) {
                demTrungBinh++;
            } else {
                demYeu++;
            }
        }
        
        System.out.println("\n--- THỐNG KÊ KẾT QUẢ ---");
        System.out.println("Số lượng Giỏi: " + demGioi);
        System.out.println("Số lượng Khá: " + demKha);
        System.out.println("Số lượng Trung bình: " + demTrungBinh);
        System.out.println("Số lượng Yếu: " + demYeu);
    }

    // ==========================================
    // 5. Hàm Tìm kiếm
    // ==========================================
    public static void timKiemSinhVien(Scanner scanner, String[] danhSachTen, double[] danhSachDiem, int soLuong) {
        System.out.println("\n--- TÌM KIẾM ---");
        System.out.print("Nhập tên cần tìm: ");
        String tuKhoa = scanner.nextLine();
        
        boolean coTimThayKhong = false;
        
        for (int viTri = 0; viTri < soLuong; viTri++) {
            String tenVietThuong = danhSachTen[viTri].toLowerCase();
            String tuKhoaVietThuong = tuKhoa.toLowerCase();
            
            if (tenVietThuong.contains(tuKhoaVietThuong)) {
                System.out.println("Kết quả: " + danhSachTen[viTri] + " - Điểm: " + danhSachDiem[viTri]);
                coTimThayKhong = true;
            }
        }

        if (coTimThayKhong == false) {
            System.out.println("Không tìm thấy sinh viên nào phù hợp.");
        }
    }
}