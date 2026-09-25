import java.util.ArrayList;

public class ArrayDemo {  // renamed to avoid conflict
    public static void main(String[] args) {

        int[][] mulArrays = {{344, 444, 555}, {99, 88, 77}};
        System.out.println("Array: " + mulArrays[0][2] + ", " + mulArrays[1][2]);

        int[] intArray = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
        for (int i = 0; i < intArray.length; i++) {
            System.out.println("intArray.Length: " + intArray[i]);
        }

        for (int i = 0; i < intArray.length; i++) {  // fixed: was 'array'
            System.out.println("lastArray: " + intArray[i]);
        }

        ArrayList<String> a = new ArrayList<>();
        a.add("java");
        a.add("selenium");
        a.add("postman");
        a.add("sql");
        for (int i = 0; i < a.size(); i++) {
            System.out.println("ArrayList: " + a.get(i));
        }
    }
}