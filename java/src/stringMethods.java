    public class stringMethods {

         public static void main (String[] args){
       
            //Creating a String Object:
        String str = "I'm learning JAVA for Selenium to be become SDET!";
        //Common String Methods:
       
        int length = str.length(); // Length of the string
        System.out.println("Length of the string: " + length);

        String upper = str.toUpperCase(); // Convert to uppercase
        System.out.println("Uppercase: " + upper);

        String lower = str.toLowerCase(); // Convert to lowercase
        System.out.println("Lowercase: " + lower);

        boolean containsSdet = str.contains("SDET"); // Check if string contains "SDET"
        System.out.println("Contains 'SDET': " + containsSdet);

        String replaced = str.replace("JAVA", "Java"); // Replace "World" with "Java"
        System.out.println("Replaced: " + replaced);

        //charAt() method to get a character at a specific index
        char charAtIndex = str.charAt(7); // Get the character at index 7
        System.out.println("Character at index 7: " + charAtIndex);

        //substring() method to get a part of the string    
        String substring = str.substring(0, 10); // Get the substring from index 0 to 10
        System.out.println("Substring: " + substring);

        //trim() method to remove leading and trailing whitespace
        String strWithWhitespace = "   Hello, World!   ";
        String trimmed = strWithWhitespace.trim(); // Remove leading and trailing whitespace
        System.out.println("Trimmed: " + trimmed);

        String strwhitespceString = "        I'm         Learning java for       Selenium to become SDET!        ";
        String trimmedwithoutspaces = strwhitespceString.trim();
        System.out.println("Trimmed Without Spaces: " + trimmedwithoutspaces);

        //split() method to split the string into an array of substrings
        String Str2 = "JAVA: Selenium: Postman: Cypress";

        String[] words = Str2.split(", "); // Split the string into an array of words
        System.out.println("Split: ");
        for (String word : words) {
            System.out.println(word);
        }

        String[] colon = Str2.split(": "); // Split the string into an array of words
        Str2.split(": "); // Split the string into an array of words
        System.out.println("Split: ");
        for (String word : colon) {
            System.out.println(word);
        }
}
    }