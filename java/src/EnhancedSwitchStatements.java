public class EnhancedSwitchStatements {
    public static String getQuarter(String month) {
        return switch (month) {
            case "JAN", "FEB", "MAR" -> "Q1";
            case "APR", "MAY", "JUN" -> "Q2";
            case "JUL", "AUG", "SEP" -> "Q3";
            case "OCT", "NOV", "DEC" -> "Q4";
            default -> "Invalid month";
        };
    }
    public static String getDayType (String week) {
        return switch (week) {
            case "MON", "TUES", "WED", "THURS", "FRI" -> "Weekday";
            default -> "Weekend";
        };
    }
    public static void main(String[] args) {
        String month = "DEC";
        String quarter = getQuarter(month);
        System.out.println("Month: " + month + " is in " + quarter);

    String week = "SUN";
    String Day = getDayType(week);
    System.out.println("Day: " + week + " is a " + Day);
}}
