public class ifElseIfElseSwitchExamples { 
    // if-else-if-else statement: used to execute different blocks of code based on multiple conditions
    public static void main(String[] args) {
        int score=60;
        if(score>=90){
            System.err.println("Grade: A+");
        }
        else if (score>=80){
            System.out.println("Grade: A");
        }
        else if (score>=70){
            System.out.println("Grade: B");
        }
        else if (score>=60){
            System.out.println("Grade: C");
        }
        else {
            System.out.println("Grade: F");
        }
        //ternary operator: simple if-else statement in a single line
        String result = (score>=90) ? "Grade: A+" : (score>=80) ? "Grade: A" : (score>=70) ? "Grade: B" : (score>=60) ? "Grade: C" : "Grade: F";
        System.out.println(result);
    
        //switch statement: used to execute different blocks of code based on the value of a variable
        int day = 4;
        switch (day) {
            case 1:
                System.out.println("Monday");
                break;
            case 2:
                System.out.println("Tuesday");
                break;
            case 3:
                System.out.println("Wednesday");
                break;
            case 4:
                System.out.println("Thursday");
                break;
            case 5:
                System.out.println("Friday");
                break;
            case 6:
                System.out.println("Saturday");
                break;
            case 7:
                System.out.println("Sunday");
                break;
            default:
                System.out.println("Invalid day");
        }
    }
}
    

