import java.util.Arrays;

public class modifyingArray {
    public static void main (String[] args){
        int[] loopArray = {22, 33, 44, 55, 66, 77, 88, 99};
        String [] readingArrayElem = {"java", "Selenium", "postman", "sql"};
        loopArray [3]  =  56;
        System.out.println("" + loopArray[3]);
        System.out.println(Arrays.toString(loopArray));
        readingArrayElem [3] = Arrays.toString(new String[]{"playwright"});
        System.out.println(Arrays.toString(readingArrayElem));
    }
}
