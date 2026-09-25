package demopack;

//Parent interface 
public interface interfaceClassDemo {

  //all variables defined in an interface are implicitly public, static, and final
    //all methods defined in an interface are implicitly public and abstract (except default and static methods

    int birthYear = 1990; // this is a constant, cannot be changed
    //public is a access modifier, static means it belongs to the interface, final means it cannot be changed
    


    //interface - has methods but no implementation and no body
    //interface is a contract that a class can implement
    //interface can have abstract methods, default methods, static methods, and final variables
    //interface can be implemented by any class, from any inheritance tree
    //interface can be used to achieve multiple inheritance in Java
    //cannot write code in an interface, only method signatures and constants
    

    public void method1GreetingWelcome();
    public void method2FarewellBye();
    public void method3DisplayBirthYear();

  
}
