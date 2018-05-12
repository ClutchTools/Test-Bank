# Strange Sequence

## Prompt

Imagine a sequence of numbers x0, x1, x2,..., xn where a given element is equal to the sum of the squared digits of the previous element. 

The sequence ends once you reach an element that has already been in the sequence appears again.  

For example, for x0 = 2 our answer would be 10 after the following sequence:

x0 = 2
x1 = 2^2 = 4
x2 = 4^2 = 16
x3 = 1^2 + 6^2 = 37
x4 = 3^2 + 7^2 = 58
x5 = 5^2 + 8^2 = 89
x6 = 8^2 + 9^2 = 145
x7 = 1^2 + 4^2 + 5^2 = 42
x8 = 4^2 + 2^2 = 20
x9 = 2^2 + 0^2 = 4
Since we have already seen 4 in the sequence, we return the length of the sequence

Write a function that accepts one argument (the first element)and returns the length of sequence