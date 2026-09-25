public class ForLoopMultiplicationTable
{

    //Multiplication Table program from 1 to 12
    public static void  main(String[] args){
        System.out.println("Multiplication Table from 1 to 12");
        for (int i=1; i<=12; i++){
            for (int j=1; j<=12; j++){
                System.out.print((i * j) + "\t");
            }
            System.out.println();
        }

        System.out.println("Find the Even numbers");
        for (int i=2; i<=20; i+=2){
            System.out.println(i);
        }

        System.out.println("Find the Odd numbers");
        for (int i=1; i<=20; i+=2){
            System.out.println(i);
        }
        System.out.println("reverse countdown by 3");
        for (int i=30; i>=0; i-=3){
            System.out.println(i);
        }
    }
}
