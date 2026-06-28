public class tim_max {
    public static void main(String[] args){
        int[] numbers = {10, 20, 30, 40, 50};
        int max_val= numbers[0];
        for(int i=1; i<5; i++){
            if (max_val < i){
                max_val = i;
                
            }
        }
    }
    
}
