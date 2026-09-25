package coreJava;

public class constructors {

    //Constructor is a special method that is used to initialize objects
    //Constructor is called when an object of a class is created //example: Car myCar = new Car();
    //Constructor has the same name as the class and does not have a return type
    //Constructor can be used to set initial values for object attributes
    //Constructor can be overloaded, meaning you can have multiple constructors with different parameters

    public constructors() {
        System.out.println("This is the default constructor.");
    }
    //parameterized constructor
    public constructors(int a, int b){
        System.out.println("This is the parameterized constructor.");
    }
    public void displayMessage() {
        System.out.println("This is a method in the constructors class.");
    }

    public static void main(String[] args) {
        
    
    constructors obj = new constructors();
    constructors obj2 = new constructors(5, 10);    
    //This will call the default constructor and display the message when the object is created
    //compiler will call the default constructor if no constructor is defined in the class and it will not display any message
        obj.displayMessage();
        obj2.displayMessage();
    }
  
}
