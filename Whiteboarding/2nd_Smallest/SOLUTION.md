## Solution

### Edge-Case
What if the array doesn't have two or more elements? 

In this case just return false but this should be a question you ask.

### Explanation

First check to make sure the array has two or more elements, if not return false immediately

While you loop through the array you need to keep track of both the smallest and 2nd smallest values as you come across them. This can be broken down to two simple checks.

if the current element is smaller than the current minimum then we know that element is now our new minimum and our old minimum is now our 2nd smallest value.

if the element is smaller than our current 2nd smallest value and didn't hit the earlier check then we know the element is not our smallest element but instead is our new 2nd smallest element.

and then just return our stored 2nd smallest value.
