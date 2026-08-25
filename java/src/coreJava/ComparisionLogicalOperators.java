public class ComparisionLogicalOperators {
    public static void main (String[] args) {
        //comparison operators: ==, !=, >, <, >=, <=
        int gameOver = 1000;
        int score = 800;
        int levelCompleted = 10;
        int levelHalfCompleted =5;
        int bonus = 100;
        boolean isGameOver = true;
        System.out.println("Is Game Over: " + isGameOver);

       int gameWinnerScore = gameOver;
       if (gameOver == 1000) {//first condition is true
           gameWinnerScore += (levelCompleted * bonus);
           System.out.println("Game Winner Score is more than/double the value of 1000: " + gameWinnerScore);
       }
        int gameRunnerUpScore = score;
       if(score!=1000){
           gameRunnerUpScore += (levelHalfCompleted * bonus);
           System.out.println("Game Runner Up Score is half way through winner score: " + gameRunnerUpScore);
       }
        if (score > 500){

        System.out.println("Score is greater than 500 " + score);
        }
        if (score < 900){

        System.out.println("Score is less than 900 " + score);
       }
        if (score <=800){

        System.out.println("Score is less than or equal to 800 " + score);
        }
        else {
            System.out.println("Score is greater than 800 " + score);
        }

        int highestScore = 100;
        int lowestScore = 50;
        System.out.println("Highest Score " + highestScore);
        boolean isHighestScore = true;
        if (lowestScore == highestScore) {//firstcondition is true
            System.out.println("Lowest score is equal to highest score: " + highestScore);
        } else if(lowestScore < highestScore){//all conditions are false except this one
            System.out.println("Lowest score is lesser than highest score: " + highestScore);
        }
        else {//all conditions are false
            System.out.println("Lowest score is equal to highest score: " + lowestScore);
        }

        int gpa = 4;
        if (gpa >=3){
            System.out.println("Eligible for scholarship: " + gpa);
        } else if (gpa>= 2.0 && gpa <= 3.0){
        System.out.println("Not eligible for scholarship: " + gpa);
    } else {
            System.out.println("May be eligible" + gpa);
        }
}
}
