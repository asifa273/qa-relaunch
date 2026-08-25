import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
public class StringArryas {

    public static void main(String[] args) {    
        ArrayList<String> a = new ArrayList<String>();
        a. add("java");
        a. add("selenium");
        a. add("postman");
        a. add("sql");
       // size() — for ArrayList ArrayList<String> a = new ArrayList<String>();  a. add("java"); a. add("selenium");
  
       // ArrayList uses size() method, NOT .length
        for (int i=0;i<a.size(); i++){
            System.out.println("normal for loop: " + a.get(i) + " "); // Accessing the element at index 0 of the first array in mulArrays
            }
        for (String val: a) {
          System.out.println("Enhanced for loop: " + val); // Accessing the element at index 0 of the first array in mulArrays
            System.out.println("lastArray: " + a + " "); // Accessing the element at index 2 of the first array in mulArrays
            }

        //  Check if an element is present in the ArrayList
       System.out.println(a.contains("selenium"));
         String[] name = {"java", "selenium", "postman", "sql"};
       
         List<String> nameArrayList = Arrays.asList(name); // Convert the array to an ArrayList
        System.out.println(nameArrayList.contains("selenium")); // Check if an element is present in the ArrayList
            for (String val: nameArrayList) { // Enhanced for loop to iterate through the ArrayList
                System.out.println("Access element at index 0: " + val); // Accessing the element at index 0 of the first array in mulArrays
            System.out.println("List all arrays : " + nameArrayList + " "); //
            }   
      
            //revserse the String literal // Reverse the string using StringBuilder
            String originalString = "Asifa Begum Lead QA UAT Engineer";
            String reversedString = new StringBuilder(originalString).reverse().toString();
            System.out.println("Original String: " + originalString);
            System.out.println("Reversed String: " + reversedString);
            //use for loop to reverse the string    // Iterate through the original string in reverse order and print each character
            for (int i= originalString.length() - 1; i >= 0; i--) {
                System.out.println("Accessing char at index " + ": " + originalString.charAt(i)); // Accessing the character at index i of the original string
            }

    }
}
