package demopack;

//Parent class of the aircraft inheritance
public  abstract class parentAirCraft {
    
         public String name = "Boeing 747";
      

    public void engine() {
        System.out.println("This is the engine rules of the aircraft.");
    }
        public void fuel() {
            System.out.println("This is the fuel rules of the aircraft.");
        }
        public abstract void bodyColor();
        
        public void audioSystem() {
            System.out.println("This is the Parent audio system rules of the aircraft.");
        } 
       
    }
