package coreJava;

import demopack.parentAirCraft;

//inheritance from the parent class
public class childAirCraft extends parentAirCraft {

    String name = "Airbus A380";
    public void getStringData(){
        System.out.println("This is the name of Child AirCraft" + name);
        System.out.println("This is the name of Parent AirCraft extending" + super.name);
    }
    public static void main(String[] args){

       System.out.println("This is the child class of the aircraft inheritance.");
        System.out.println("Name of the child aircraft: " + new childAirCraft().name);
        
     
    
        childAirCraft obj = new childAirCraft();
        obj.engine();
        obj.fuel();
        obj.bodyColor();
        obj.audioSystem();


    }

    @Override
    public void bodyColor() {
        System.out.println("This is the RED body color of the aircraft.");
}

@Override
public void audioSystem() {
    System.out.println("This is the Child audio system rules of the aircraft.");
}



}   