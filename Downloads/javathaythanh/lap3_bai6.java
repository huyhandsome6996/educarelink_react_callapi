public class lap3_bai6 {
    public static void main(String[] args){
        for(int i=1; i<51; i++){
            if(i%3==0){
                continue;
            }
            else if (i%5==0 || i%9==0 ){
                break;
            }
            else{
                System.out.println(i);
            }
        }
    }
}
