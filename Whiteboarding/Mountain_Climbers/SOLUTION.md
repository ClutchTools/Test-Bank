## Solution

### Common Questions
* Will there be duplicate values or all integers will be unique?
```
A.) Duplicate maximum values is the more difficult version of this problem which the included solution <br>
will not handle. Same for duplicate minimums. There will be duplicate values though inbetween that are <br>
not the maximum or minimum value.
```
* Will I be given anything besides a 2D array of integers?
```
A.) No they will only be given a 2D array of integers
```
* Will the 2D array always be a square?
```
A.) The 2D array will always be either a square or a rectangle
```

### Edge Cases
* No path to return
```
Example:
[
[4, 3, 5, 1]
[2, 2, 2, 3]
[4, 5, 6, 2]
[5, 2, 8, 7]
]

If no path, return undefined
```
* Negative Numbers
```
Example:
[
[-2, -5, -1]
[2, 0, 1]
[5, 6, -1]
]

When finding min and max position the person's inital variable have to be min= infinity, max = -infinity,<br>
or both equal to null/undefined
```
* Flat Plane/Local Maximum
```
Example:
[
[0,3,4,5,6,6,3]
[1,3,4,3,6,6,3]
[2,3,4,3,3,3,3]
[4,4,4,5,6,7,9]
]

A solution without keeping track of where the person have moved from would hit an infinite loop <br>
in this solution. Any data structure that keeps track of places been and they implement a check <br>
against it with each step would handle this.
```
