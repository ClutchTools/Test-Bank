# Roomba Circles

## The Scenario
Imagine a roomba that is vacuuming an infinitely-sized, two-dimensional room (i.e., the x-y coordinate plane).  The roomba is initially sitting at position (0, 0).  The roomba is given a set of instructions in the form of a string made up of three letters:

 1. 'R' - turn 90 degrees to the right
 2. 'L' - turn 90 degrees to the left
 3. 'G' - move forward 1 unit

The roomba executes the instructions character-by-character, and once it reaches the end of the string, it starts again from the beginning of the string, repeating itself ad infinitum.
## The Problem
Write a function which takes in a string composed of 'R's, 'L's, and 'G's. Your function should return true if the roomba is moving in a circle, and false otherwise.  A circle in this case means that, during its infinite execution of the given instructions, the roomba always returns to its initial position.

### Examples

 - roombaCircles('GGR') // returns True
 - roombaCircles('GLL') // returns True
 - roombaCircles('GRGL') // returns False
