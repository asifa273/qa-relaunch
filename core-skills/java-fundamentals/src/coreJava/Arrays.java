public class Arrays {
    public static void main(String[] args) {
        int[] intArray = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
        int[] [] mulArrays = {{344, 444, 555}, {99, 88, 77}};
        System.out.println("Array: " + (mulArrays [0][1]) + " ");
/*
        System.out.println("whats in this array: " + intArray[0]);
        System.out.println("whats in this array: " + intArray[1]);
        System.out.println("whats in this array: " + intArray[2]);
        System.out.println("whats in this array: " + intArray[3]);
        System.out.println("whats in this array: " + intArray[9]);

 */
        for (int i = 0; i < intArray.length; i++) {
            intArray[i] = i * 10;
        }
        printArray(intArray);
        }
        public static void printArray(int[] array){
            for (int i = 0; i < array.length; i++) {
        System.out.println("Array: " + array[i] + " ");
    }
}

}