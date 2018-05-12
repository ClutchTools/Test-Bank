# K-Closest Points
## The problem
Given an array of X-Y coordinate points and an integer K, determine the K-closest points to the origin (0, 0). The order in which you return the points does not matter. K will be less than or equal to the length of the array. You may not use Array.sort() - your solution should run in O(n) time where n is the length of the array.
### Examples
- kClosest([[0, 1], [1, 0], [1, 1]], 2) // returns [[0, 1], [1, 0]]
- kClosest([[5, 5], [10, 1], [-1, -2], [3, 3]], 3) // returns [[-1, -2], [3, 3], [5, 5]]