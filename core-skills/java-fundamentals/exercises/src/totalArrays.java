import java.util.Arrays;

public class totalArrays {
    public static void main(String[] args){
        int [] addition = {10, 20, 30, 40, 50};
        int [] subtraction = {50, 20, 10, 5, 2};
        String [] tools = {"java", "selenium", "sql", "postman"};
        int additionTotal = 0;
        int subtractionTotal = 0;

        for (int j : addition) {
            additionTotal += j;

        }
        for (int k: subtraction){
            subtractionTotal -=k;
        }
        int count = tools.length;
        for (int l = 0; l < tools.length; l++){
        System.out.println("list down the tools: " + tools[l]);
        }
        System.out.println("Addition of numbers: " + additionTotal);
        System.out.println("Subtraction of numbers: " + subtractionTotal);
        System.out.println("Sum of tools: " + count);

    }
}
