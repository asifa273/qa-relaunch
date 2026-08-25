void main() {
    //for loop
    for (int i=5; i>0; i--)
        System.out.println("Hello World - for loop: " + i);

    //countdown 10 to 1
    for (int b=10; b>1; b--){
        System.out.println("Countdown from 10 to 11:" + b);
    }
    for (int c = 1; c <= 5; c++){
        System.out.println("count 1 to 10 " + c );
    }

    //calculate interest methods with dollar amount of 100
    double amount = 100.0;
    for (double intRate =7.5; intRate<=10.0; intRate+=0.25){
        double interestAmount = calculateIntMethod(amount, intRate);
        System.out.println("100 at " + intRate + "% interest: " + interestAmount);
    }
}
double calculateIntMethod(double amt, double intRate){
    return (amt * (intRate /100));
}