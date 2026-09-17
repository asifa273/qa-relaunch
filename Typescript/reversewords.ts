//Reverse Words
/*Problem
Return the words of a sentence in reverse order. Words are separated by one or more spaces. The result should have single spaces between words and no leading or trailing spaces.

Examples
reverseWords("hello big world")  →  "world big hello"
reverseWords("  Sands   CMS  ")  →  "CMS Sands"
*/

function reverseWords(s: string): string {
    return s.trim().split(/\s+/).filter(Boolean).reverse().join(' ');
    //trim explain
}
console.log(reverseWords("hello big world"));
console.log(reverseWords("  Sands   CMS  "));


//Can you do it without split, by walking the string character by character?
function reverseWordsWithoutSplit(s: string): string {
    let result = '';
    let i = s.length-1;

    while(i>=0){
        //1. skip spaces
        while(i>=0 &&s[i]===' '){
            i--;
        }
        if(i<0) break;

        //2. find end of current word
        const end = i;

        //3. find the start of the current word
        while(i>=0 && s[i]!==' '){
            i--;
        }
        //4. extract the word using boundries
        const word = s.slice(i+1, end+1);

        //5. add the word to the result
        if(result.length>0){
            result += ' ';
        }
        result += word;
    }
    return result;
}

console.log(reverseWordsWithoutSplit(" cat dog  "));


//How would you test this function? List the edge cases out loud.