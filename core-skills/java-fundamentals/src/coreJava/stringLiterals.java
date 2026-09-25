public class stringLiterals {
    public static void main(String[] args) {
        String name = "Asifa";
        String name1 = "Asifa";
        String name3 = "Asifa Begum Lead QA UAT Engineer";
        String name2 = new String("Asifa");
        System.out.println(name == name1); // true, because both name and name1 refer to the same string literal in the string pool
        System.out.println(name == name2); // false, because name2 is a new object created in the heap
        System.out.println(name.equals(name2)); // true, because the equals() method compares the content of the strings
        System.out.println(name1.equals(name2)); // true, because the equals() method compares the content of the strings

        String names = "Asifa Begum Lead QA UAT Engineer";
        String [] splittednames = names.split("Lead");
        System.out.println("Split string: " + splittednames[0].trim()); // Access the first substring (index 0) after splitting
        System.out.println("Split string: " + splittednames[1].trim()); // Access the second substring (index 1) after splitting
        splittednames[1] = "QA Engineer"; // Modifying the second substring (index 1) after splitting
        System.out.println("Modified split string: " + splittednames[1].trim()); // Access the modified second substring (index 1) after splitting
        for (int i = 0; i < splittednames.length; i++) {
            System.out.println("Element at index " + i + ": " + splittednames[i].trim());
        }
        //length — for regular Arrays (String[] tools = {"Selenium", "Playwright", "Postman"};) --- Regular arrays use .length property
        for (int i=0; i<names.length(); i++){

        }

    }

}
