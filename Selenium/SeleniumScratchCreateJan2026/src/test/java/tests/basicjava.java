package tests;

public class basicjava {

    public static void main(String[] args) {

boolean gameOver = true;
int score = 1000;
int levelCompleted = 5;
int bonus = 100;

if (score == 5000){
    System.out.println("Your score is 5000");
} else if (score == 1000){
    System.out.println("Your score is 1000");
} else if (score == 500){
    System.out.println("Your score is less than 1000");     

    }

if (gameOver == true){
  if (score > 5000){
    int finalScore = score + (levelCompleted * bonus);
    System.out.println("Your final score is " + finalScore);
    } else if (score == 1000){
        int finalScore = score + (levelCompleted * bonus);
        System.out.println("Your final score is " + finalScore);
    } else {
        int finalScore = score + (levelCompleted * bonus);
        System.out.println("Your final score is " + finalScore);    
  }
        
    }
}
}

        /*
        System.out.println("Hello, World!");
        boolean flag = false;
        if (flag == true) {
            System.out.println("Flag is true");
        } else {
                System.out.println("Flag is false");
            }   
    
    double firsttopScore = 90;
    if (firsttopScore >=80){
        System.out.println("GPA 4.0");

    } else if (firsttopScore >=60){
        System.out.println("GPA 3.0");
    }
     int secondtopScore = 70;
        if (secondtopScore >=70){
            System.out.println("GPA 3.0"); 
        } 
            else if(secondtopScore >=50){
                System.out.println("GPA 2.0");
            }
        }
}
*/
