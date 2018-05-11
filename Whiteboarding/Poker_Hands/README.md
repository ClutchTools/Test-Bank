## Prompt
```markdown
Write a function that will return the rank of a poker hand.
```

##### Example of a hand - ['1♦', '12♣', '7♦', '9♠', '13♦']

* Each element will always have a number that represents the rank of the card, followed by the suit.
* Each element is a string
* Aces are represented by the character 0 (zero)
* Suits are represented as follows -  ♦♥♣♠ , these are string characters
* Each number corresponds to its respective card rank, with 11,12,13 == J,Q,K
* There is only one output - the highest rank of the hand

## Poker Hand Rankings

1. Royal Flush
2. Straight Flush
3. Four of a Kind
4. Full House
5. Straight
6. Flush
7. Three of a Kind
8. Two Pair
9. Pair
10. High Card


## Sample Cases

```
let hand = ['1♦', '12♦', '7♦', '9♦', '13♦']
calculateRank(hand) === 'Flush';
let hand2 = ['12♦', '12♣', '12♥', '9♦', '9♥']
calculateRank(hand2) === 'Full House';
```
