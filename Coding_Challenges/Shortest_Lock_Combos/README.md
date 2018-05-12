# Strange Sequence

## Prompt 1

Write a function that determines the minimum number of rotations needed to unlock a a basic number combination lock

A rotation is defined as each time you increment/decrement a number by one.  
For example, to get from 2 to 4, you would perform 2 rotations:
2 -> 3, and 3 -> 4

Furthermore, the lock can wrap around the numbers, so that it would only take 3 rotations to get from 9 to 2
9 -> 0, 0 -> 1, and 1 ->2

Your function takes two arguments:
1. the current state of the lock, which is shown as an array of single digits representing each bit of the lock
2. An array showing the unlocking position
Both arrays will made up of single digits and they will be the same length, though they can be of any size

Example:
current lock state: [0, 0, 0]
unlocking combination: [3, 1, 8]

first: 0 -> 1 -> 2 -> 3   ____ 3 rotations
Second: 0 -> 2 ___ 1 rotation
third: 0 -> 9 -> 8 ____ 2 rotations
Total: 6 rotations


## Prompt 2

Update your answer to the previous prompt to account for locks with arbitrary characters instead of numbers 0-9.
They will be accepted as a third character set array, and will contain at least two strings.  
The character set is ordered and will contain only unique values. 
Similarly, you are able to wrap around the lock from one end of the array to the other. 
Your first two array arguments will only contains values that appear in the character set of locks

Example: 
starting point: ['*', '#', '+']
unlocking combination: ['+', 'i', '{\}']
Character set: ['!', '+', '*', ')', 'i', '=', '{\}', '#']

The result would be the following:
'*' -> '+ ____ 1 rotation
'#' -> '{\}' -> '=' -> 'i' ____ 3 rotations
'+' -> '!' -> '#' -> '{\}' ___ 3 rotations
Total: 7 rotations