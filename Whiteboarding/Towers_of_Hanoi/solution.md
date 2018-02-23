# Towers of Hanoi - solution
The number of moves required to solve this puzzle is given by (2^n) - 1.  As such, the sequence of moves becomes difficult to follow as n increases.  However, the puzzle can be easily solved for any size input by breaking it down into smaller problems that can be solved recursively.  For n = 2, the solution has three steps and looks like this:
## starting position
**start: [2, 1]**
**helper: [ ]**
**destination: [ ]**

## move #1
**start: [ 2 ]**
**helper: [ 1 ]**
**destination: [ ]**

## move #2
**start: [ ]**
**helper: [ 1 ]**
**destination: [ 2 ]**

## move #3** **
**start: [ ]**
**helper: [ ]**
**destination: [ 2, 1 ]**


If we model our algorithm off of this example, we want our algorithm to follow three simple steps:
1. Move n - 1 discs from **start** to **helper**
1. Move disc **n** from **start** to **destination**
1. Move n - 1 discs from **helper** to **destination**
The tricky part of implementing this recursive algorithm is keeping track of the parameters we pass to our function during each recursive call.  At the outset, our function is given by: 
```markdown
let hanoi = (n, start, helper, destination) => {...}
```
**Step one** is a recursive call given by:
```markdown
hanoi(n-1, start, destination, helper);
```
Notice that, compared to the original function declaration, the positions of **destination** and **helper **are reversed.  We will see why this is necessary in the next step.

**Step two** involves popping the **start** stack and pushing the popped value onto the **destination** stack (and printing out the move that we made):
```markdown
if ( start[0].length > 0 ) {
    let disc = start[0].pop();
    console.log('moving disc ' + disc + ' from ' + start[1] + ' to ' + destination[1]);
    destination[0].push(disc);
}
```
The key point to understand here is this: *since we change the order of function parameters in the recursive calls, the variables **start** and **destination** will not actually refer to the* *original function parameters **start **and **destination **at every point in the call stack**.  ***Furthermore, we should notice that this is actually the only step in the solution where we take a disc off of one 'rod' and move it onto another. Everywhere else in the function, we are making recursive calls and flipping around the order of the function parameters.

**Step three **is a recursive call given by:
```markdown
hanoi(n-1, helper, start, destination);
```
Here, we reverse the positions of **helper** and **start **so that when we recurse, we will be executing the third step of our algorithm, moving a tower of n - 1 discs from **helper** to **destination**.

Examine the complete solution code below and, if it remains unclear, try to diagram the call stack for n = 1, n = 2, and n = 3.
```markdown
let hanoi = (n, start, helper, destination) => {
    if ( n > 0 ) {
        // move tower of size n - 1 from start to helper 
        hanoi(n - 1, start, destination, helper);
        // move disc from start to destination
        if ( start[0].length >= 0 ) {
            let disc = start[0].pop();
            console.log('moving disc ' + disc + ' from ' + start[1] + ' to ' + destination[1]);
            destination[0].push(disc);
        }
        // move tower of size n - 1 from helper to destination
        hanoi(n - 1, helper, start, destination);
    }
}
```
