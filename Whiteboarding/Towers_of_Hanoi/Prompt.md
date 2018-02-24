# **Towers of Hanoi**
## Prompt
```markdown
Imagine a rod with n discs stacked on it in sorted order such that the largest disc sits at the bottom of the stack and the smallest disc sits on top of the stack. For example, if n = 3, the largest disc (#3) would be on the bottom, #2 would be in the middle, and #1 would be on the top.  

There are two empty rods next to this rod (let's call them helper and destination).  Devise an algorithm that will move all the discs from the start rod to the destination without breaking either of the following rules: 
```
1. You may only move one disc at a time.
1. A disc cannot be placed on top of a smaller disc.
## The inputs to your algorithm are:
- **n:** an integer
- **start:** a stack containing __n__ values sorted from largest to smallest
- **helper:** an empty stack
- **destination:** an empty stack
- NOTE: it will be helpful to treat each stack as a tuple where the value at index 0 is the stack itself, and the value at index 1 is the name of the stack.
## The output of your algorithm should be:
```markdown
Print statements describing each of the steps you must take to solve the puzzle in the minimum number of moves.
```

## *Example input:*
- **n = 2**
- **start = [[2, 1], "start"]**
- **helper = [ [ ], "helper" ]**
- **destination: [ [ ], "destination" ]**
## Example output:
"Disc 1 moved from start to helper", 
"Disc 2 moved from start to destination", 
"Disc 1 moved from helper to destination"
