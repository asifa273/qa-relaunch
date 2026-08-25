public class whileLoops {
        public static void main (String[] args) {
            System.out.println("Sum until 100: WhileLoop");
            int totalSum = 0;
            int startNum = 1;
            while(startNum <= 100){
                totalSum += startNum;
                System.out.println("Adding " + startNum + ", sum = " + totalSum);
                startNum++;
            }
            System.out.println("Final sum: " + totalSum);
        }
    }


