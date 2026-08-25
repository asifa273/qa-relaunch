public class methodsbooleanOdd {

        public static boolean isOdd(int number ){
            if (number % 2 != 0){
                return true;
            }else {
                return false;
            }
        }

        public static void main (String[] args){
            System.out.println(isOdd(4));
            System.out.println(isOdd(7));
            if (isOdd(11)){
                System.out.println("Number 11 is odd");
            }else {
                System.out.println("Number 11 is even");
            }
        }
    }

