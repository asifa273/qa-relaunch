public class methodsBooleanEven {
    public static boolean isEven(int number ){
       if (number % 2 == 0){
           return true;
       }else {
           return false;
       }
    }

    public static void main (String[] args){
        System.out.println(isEven(4));
        System.out.println(isEven(7));
        if (isEven(10)){
            System.out.println("Number 10 is even");
        }else {
            System.out.println("Number 10 is odd");
        }
    }
}
