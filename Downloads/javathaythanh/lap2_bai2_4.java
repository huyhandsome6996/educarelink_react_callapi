public class lap2_bai2_4 {
    public static void main(String[] args){
        int a= 1;
        int b= 2;
        int c= 3;
        if(a>b && a>c){
            System.out.println(a+ " Là số lớn nhất");
        }
        else if (b>a && b>c){
            System.out.println(b+ " Là số lớn nhất");            
        }
        else if (c>a && c>b){
            System.out.println(c+ " là cố lớn nhất");
        }
    }
}
