/*
Problem
Return an object that counts how many times each character appears. 
Counting is case-sensitive and includes every character.

Examples
charFrequency("hello")  →  { h: 1, e: 1, l: 2, o: 1 }
*/

function charFrequency(s: string): Record<string, number> {
  const freq: Record<string, number> = {};
  for (const ch of s) {
    freq[ch] = (freq[ch] ?? 0) + 1;
  }
  return freq;
}
