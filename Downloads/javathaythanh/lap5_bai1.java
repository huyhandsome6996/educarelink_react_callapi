public class lap5_bai1 {
    public static void main(String[] args){
        //a, khai báo và khởi tạo mảng chứa 5 môn học: Toán, lý, hoá, anh, tin
        String[] list_mon= {"Toán","Lý","Hoá","Anh","Tin"};
        //b, In ra tất cả các môn học theo định dạng: "Môn 1: Toán", "Môn 2: Lý", ...
        for(String mon : list_mon){
            System.out.println("Môn"+":"+mon);
        }
        //c. In ra số lượng môn học bằng thuộc tính length.
        System.out.println(list_mon.length);

        //d. Khai báo mảng điểm tương ứng cho 5 môn. In ra môn học và điểm của từng môn.
        double[] diem= {1,2,3,4,5};
        for(int i=0; i<list_mon.length; i++){
            System.out.println("Môn " + list_mon[i] + ": " + diem[i] + " điểm");
        }
    }
    
}
