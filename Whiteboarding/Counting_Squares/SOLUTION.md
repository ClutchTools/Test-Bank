## Solution

The brute force of this is pretty obvious...
Loop through and check if the number is a perfect square.

But to make this function constant time we need a better approach. 
Thankfully a small math trick to know is if you take the square root of a number and round it down the number you get is the largest square number in the range of 0 to the number you started with

Example:

If you square root 18 and round down you get 4. 4x4 gives you 16 which is the largest perfect square between 0 -> 18

So if 4x4 is in that range would it be too much to assume 3x3 is? 
As 3x3 = (9) is less than 18.
So is 2x2 = (4)
And 1x1 = (1)

So if you notice the count of square numbers under 18 is 4 which is also the Math.floor(Math.sqrt(18))

So if we do that operation for the larger number then we know the number of perfect squares between 0 and that larger number. We still need between the count between the smaller and larger number and not before the smaller number (between 0 and the smaller number)

0 -> [Numbers we don't care about] -> Smaller # -> [Numbers we want] -> Larger #

So what if we do this same approach to calculate all the perfect squares between the smaller number and 0 and then subtract those from what we found when we calculated the square root of the larger number. This would then give us the count of perfect sqaures for the space between the larger and smaller number!