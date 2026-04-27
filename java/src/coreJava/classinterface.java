package coreJava;

//Child class that implements the interface
import demopack.interfaceClassDemo;

//Child class that implements the interface
public class classinterface  implements interfaceClassDemo {
    public static void main(String[] args) {
        interfaceClassDemo obj = new classinterface();
        obj.method1GreetingWelcome();
        obj.method2FarewellBye();
        obj.method3DisplayBirthYear();
    }
    
    @Override
    public void method1GreetingWelcome() {
        System.out.println("Hello, welcome to Java programming!");
    }

    @Override
    public void method2FarewellBye() {
        System.out.println("Goodbye, see you next time!");
    }
    @Override
    public void method3DisplayBirthYear() {
        System.out.println("The birth year is: " + birthYear);
    }

}
