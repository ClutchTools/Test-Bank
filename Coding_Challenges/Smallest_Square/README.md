# Smallest Squre

## Prompt

Write a function that when given two arrays (1st array will be of the x values for each point and the 2nd will be an array of the corresponding y values for each point) and a random integer K will find the area of the smallest perfect square that would encompass K number of points in it.

Example

```
Inputs:
let x = [0, 2, 2];
let y = [0, 7, 2];
let k = 2;

const smallestSquare = function(arrayX, arrayY, k){
/*your code here*/
}

Output:
Should return 16

Explanation:
The square will encompass either (0,0) + (2,2) or (2,7) + (2,2)
*The squares sides can't go through the points but have to wrap around them*

```

**BONUS POINTS IF YOU CAN SOLVE THIS IN BETTER THAN EXPONENTIAL TIME**