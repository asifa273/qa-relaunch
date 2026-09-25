public class IfElseSwitchStatements {

    public static void main(String[] args) {
        //comparison operators: ==, !=, >, <, >=, <=
        int age = 30;
        double yearsOfExp = 7.5;
        boolean isEligibleForSeniorRole = false;

        System.out.println("Is age >25:" + (age > 25));
        System.out.println("Is experience is more than7:" + (yearsOfExp > 7));
        System.out.println(age <= 25 && yearsOfExp <= 7);
        System.out.println(age != 25 || yearsOfExp != 7);
        System.out.println(age >= 25 && yearsOfExp >= 7);

        if (age >= 30 && yearsOfExp >= 7) {
            isEligibleForSeniorRole = true;
            System.out.println("Eligible for Senior Role: " + isEligibleForSeniorRole);
        } else {
            System.out.println("Not Eligible for Senior Role: " + isEligibleForSeniorRole);
        }

        boolean hasCertification = true;
        if (isEligibleForSeniorRole || hasCertification) {
            System.out.println("Eligible for Senior Role: " + hasCertification);
        } else {
            System.out.println("Not Eligible for Senior Role: " + isEligibleForSeniorRole);
        }
        int switchValue = 2;
        switch (switchValue) {
            case 1 -> System.out.println("value was 1");
            case 2 -> System.out.println("value was 2");
            case 3, 4, 5 -> {
                System.out.println("Value was either 3, 4 or 5");
            } default -> {
                System.out.println("was not 1, 2 , 3, 4 or 5");
            }
        } String tool = "JAVA";
        switch (tool) {
            case "JAVA" -> System.out.println("Java is selected");
            case "Python" -> System.out.println("Python is selected");
            default ->{
                System.out.println("No tool selected");
            }
        }

        }
}
