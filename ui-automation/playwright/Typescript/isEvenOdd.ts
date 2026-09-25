class Solution{
    isEven(n: number):boolean {
        return (n & 1) === 0;
    }
}
const solution = new Solution();
const n: number = 15;

if (solution.isEven(n)){
    console.log("true");
}else{
       console.log("false");
}