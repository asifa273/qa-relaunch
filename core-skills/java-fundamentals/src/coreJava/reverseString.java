public class reverseString {
    public static void main(String[] args) {
        String originalString = "Hello Madam";
        String reversedString = reversedString(originalString);
        System.out.println("Original String: " + originalString);
        System.out.println("Reversed String: " + reversedString);
        String a = "Hello String Literal";
        String b= "Hello String Literal";
        a.concat("Check1");
        System.out.println(a); //Hello String Literal //String a is not changed because strings are immutable, so it creates a new string object in memory with the value "Hello String LiteralCheck" but it does not change the original string a.
        System.out.println(b); //Hello String Literal //String b is also not changed because it references the same string literal in the string pool, so it still points to the original string "Hello String Literal".
        String c = a.concat(" " + "Check2");
        System.out.println(c); //Hello String LiteralCheck1Check2 //String c is a new string object created by concatenating the original string a with "Check1" and then concatenating


        StringBuilder sb = new StringBuilder("Hello String Builder ");
        sb.append("Check3");
        System.out.println(sb); //Hello String Builder Check3 //StringBuilder sb is mutable, so when we append "Check3" to it, it modifies the original StringBuilder object in memory

    }
/* 
    public static String reversedString(String str){
        String reversed = "";
        for (int i = str.length()-1; i >= 0; i--){
            reversed += str.charAt(i);
        }
        return reversed;
          }
        */
  
   public static String reversedString(String str) {
       StringBuilder sb = new StringBuilder(str);
      return sb.reverse().toString();
    }
}

//String a = "Hello Madam"; //String literal, stored in the string pool
//Strig c= "Hello Madam"; //String literal, stored in the string pool, 
            // and it will reference the same memory location as String a because they have the same content
            //Strings are immutable- means cannot be altered or changed once they are created. When you create a new string, it creates a new object in memory. 
             //If you try to modify a string, it will create a new string object instead of changing the original one.

             //string builder
//thats why string builder is used to reverse the string because it is mutable and can be modified without creating a new object in memory. 
// It allows us to efficiently reverse the string without creating multiple string objects.
//String b = new String("Hello Madam"); //String object, stored in the heap