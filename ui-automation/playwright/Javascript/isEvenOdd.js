class Solution {
    isEven(n) {
        return (n & 1) === 0;
    }
}

const solution = new Solution();
const n = 15;

if (solution.isEven(n)) {
    console.log("true");
} else {
    console.log("false");
}



