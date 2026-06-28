public class lap2_bai2_3 {
    public static void main(String[] args){
        int diem= 100;
        if(diem>100 || diem<0){
            System.out.println("Không có điểm đó");
        }
        else if (diem>=90 && diem<= 100){
            System.out.println("A");
        }
        else if (diem>=80 && diem<90){
            System.out.println("B");
        }
        else if (diem >= 70 & diem<80){
            System.out.println("C");
        }
        else if (diem>=60 && diem<70){
            System.out.println("D");
        }
        else{
            System.out.println("F");
        }
    }
}
