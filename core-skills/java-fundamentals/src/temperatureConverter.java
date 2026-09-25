import static jdk.internal.org.jline.utils.Colors.C;
import static jdk.vm.ci.riscv64.RISCV64.CPUFeature.F;

public class temperatureConverter {
    public static double CtoF(double celsius){
        double CtoF = (celsius * 9/5) + 32;
        System.out.println("Celsius to Fahrenheit: " + CtoF);
    return CtoF;

    }

    public static double FtoC(double Fahrenheit){
        double FtoC = (Fahrenheit - 32) * 5/9;
        System.out.println("Fahrenheit to Celsius: " + FtoC);
        return FtoC;
    }
    public static void main(String[] args){
        double CtoF =CtoF(20);
        System.out.println("20°C = " + CtoF + "°F");
        double FtoC = FtoC(90);
        System.out.println("90°F = " + FtoC + "°C");


    }
}
