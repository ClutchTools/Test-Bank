# Sales Intervals
## Prompt
You are given a class of the following format, where startTime and endTime are inclusive:

```
class Interval(startTime, endTime, price) {
	this.startTime = startTime;
	this.endTime = endTime;
	this.price = price;
}
```

Given an input Array of Intervals, output an array of Intervals such that each Interval indicates
the minimum price for that given Interval.

Additional Detail:
If there is no Interval that has a price at a given time, return the previous minimum price for that index,
e.g. if there is a gap between intervals, utilize the minimum price from the beginning of the gap.


Examples:
```
Example:
Input: [Interval(1, 5, 20), Interval(3, 8, 15), Interval (7, 9, 8)]
Output: [Interval(1, 3, 20), Interval(3, 7, 15), Interval(7, 9, 8)]

Gap Example:
Input: [Interval(1, 5, 20), Interval(6, 10, 15)]
Output: [Interval(1, 6, 20), Interval(6, 10, 15)]

```
