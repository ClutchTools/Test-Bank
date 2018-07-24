Poker
=========

Prompt
======

Create a function that takes in two poker hands and returns the winning hand. Return 'TIE' if the hands are tied.

Each hand will be an array of five objects, where each object has a suit and value property.

Don’t worry about tie breaks; ie if the two hands are the same, don’t worry about which straight or flush is stronger than the other.

EXCEPTION: The ONLY tiebreak to consider is a Royal Straight Flush, which should beat any other Straight Flush

Link for poker hands: http://img.rankplan.net/p/3/pokerhands_big.jpg


Example to give
```
Input: (hand1, hand2)
hand 1 =
[ {value: 1,suit: 'spade'},
  {value: 3,suit: 'spade'},
  {value: 11,suit: 'spade'},
  {value: 14,suit: 'spade'},
  {value: 7,suit: 'spade'} ]

hand 2 = 
[ {value: 1, suit: 'spade'},
  {value: 1, suit: 'diamond'},
  {value: 11, suit: 'diamond'},
  {value: 11, suit: 'heart'},
  {value: 7, suit: 'club'} ]

Output: hand1
Explanation: hand1 is a flush, while hand2 is a two pair

```
