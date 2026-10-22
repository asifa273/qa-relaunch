//palindrome Checker

/*
Problem
Return true if the string reads the same forwards and backwards, ignoring case and any character that is not a letter or digit.

Examples
isPalindrome("A man, a plan, a canal: Panama")  →  true
isPalindrome("race a car")  →  false
*/

function isPalindrome(s: string): boolean{
    const cleanStr: string = s.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();

    let left: number = 0;
    let right: number = cleanStr.length-1;

    while(left<right){
        if(cleanStr[left]!= cleanStr[right]){
            return false;
    }
    left ++;
    right--;
}
return true;
}

console.log(isPalindrome("A man, a plan, a canal: Panama"));

//Can you skip non-alphanumeric characters without building a cleaned string at all?

function isPalindromeSkipNonAplhanumeric(s:string): boolean{

    let left: number = 0;
    let right:number = s.length-1;

    while(left<right){
        //1. skipping non-alphanumeric characters from left
        while (left < right && !/[a-zA-Z0-9]/.test(s[left] ?? "")){
            left ++;
        }
        //2. skipping non-alphanumeric characters from right
        while (left < right && !/[a-zA-Z0-9]/.test(s[right] ?? "")){
            right --;
        }
        //3. Compare the characters after converting to lower case
        if ((s[left] ?? "").toLowerCase() !== (s[right] ?? "").toLowerCase()){
            return false;
        }
        left ++;
        right --;
    }
    return true;
}


console.log(isPalindrome("12221"));


//palindrome interview example