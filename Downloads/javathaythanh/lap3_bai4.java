import java.util.Scanner;

public class lap3_bai4 {
    public static void main(String[] args){
        Scanner sc= new Scanner(System.in);
        int n= sc.nextInt();
        int tong=0;
        while(n != 0){
            tong+=n;
            n= sc.nextInt();
        }
    System.out.println(tong);
    }
    
    
}
