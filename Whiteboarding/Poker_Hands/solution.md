# Poker Hands - Solution

*[Medium article on this solution](https://medium.com/@jonathanyuenby/how-i-built-my-first-react-native-app-part-2-how-do-i-figure-out-the-strength-of-a-poker-hand-d08f1f4b3c09)* <- Give it some claps if you enjoyed this solution

### Algorithm

An easy way to approach this problem is by identifying the key rules and breaking it down into smaller, individual problems.

We know that we just need to return the highest poker rank, so we can check each ranking from top to bottom and see whether or not the hand satisfies the respective requirement.

To start, let's think about some of the common rules that decide the ranking of each hand.
1. Are all the cards of the same suit?
2. Do the numbers of a card form a range? (consecutive numbers)
3. What are the frequencies for each card?



Let's break down our problem with these new rules and apply them to our ranking list.

| Poker Rank        | isSuited        | isRange  | Frequency |
| ------------- |:-------------:| :-------------:| :-------------:
| Royal Flush      | ✓ | ✓ | [1,1,1,1,1]
| Straight Flush   | ✓ | ✓ | [1,1,1,1,1]
| Four of a Kind   |   |   | [4,1]
| Full House       |   |   | [3,2]
| Flush            | ✓ |   |  X
| Straight         |   | ✓ | [1,1,1,1,1]
| Three of a Kind  |   |   | [3,1,1]
| Two Pair         |   |   | [2,2,1]
| One Pair         |   |   | [2,1,1,1]
| High Card        |   |   | [1,1,1,1,1]

Now our approach is simpler, we know that we can cross off certain rankings if they don't satisfy `isSuited` or `isRange`. We just need to figure out a way to implement the frequency rule.

If we use an array to represent the frequency of each card, we can narrow down what the ranking is based on it's length. For rankings with the same "frequency lengths", we need to know the contents of the frequency array.

To make it easier for readibility and to handle more cases, we can represent the frequencies with an array of tuples, with the first element representing the card number, and the second representing the specific card's frequencies. As such:

 `frequency === [[10, 4],[1, 1]]`

Now our frequency array has a wealth of information in it. We can use the length of the array itself to narrow down our options, and if needed, we can look further into the array to find out what specific cards were in our hand, as well as how many times each card appeared. And finally, since our tuples are ordered by frequences from most to least, we can easily distinguish between a Four of a Kind and a Full House.

Example use case: ```frequency[0][0]``` will give us the card that appears the most in our hand, and ```frequency[0][1]``` will give us how many times it appeared.

Note that this is entirely optional but it is a good way to approach problems. Think about the how you want to order your information and what they can be used for. It will be especially impressive if you can come up with ways to reuse old code or satisfy future problems.


---

### Pseudo-pseudo code

Now that we have our 3 rules set up, we can set up some statements that help us decide what to return.

We know that out of our three helper functions, two return a boolean and one returns an array of tuples (in a very specific format). If we put all three of those returned values into their own variables, it makes things easier

`isSuited === T/F`
`isRange === T/F`
`frequencies === array of tuples`

Then we just write a bunch of if statements that correspond to our table.

```
if(isSuited && isRange) {
    if(frequencies[4][0] === '13' && frequencies[0][0] === '1') {
      return 'Royal Flush'
    } else {
      return 'Straight Flush'
    }
}
```

We know that if isSuited && isRange is true, there are only two possible outcomes, and whenever isRange is true means that the frequency array must contain 5 elements, so we can access the tuples directly with confidence. Here we are checking if the last card is a K, if it is then it has to be a Royal Flush.


Looking back at our table, we can use process of elimination with our boolean values, however, if both are false, then things get a little bit trickier. Let's look at what we should do when comparing frequencies only.

```
if (frequencies.length === 2) {
  if (frequencies[0][1] === 4) {
    return 'Four of a Kind'
  } else {
    return 'Full House'
  }
}
```

Note that the card number itself is a string value, whereas the frequency is a number, this is just a personal preference.

We know that `isSuited === false && isRange === false`, so we just have to check for the next poker ranking, Four of a Kind and Full House, both of which have a frequency array of length 2. Again, we can simply access the second element of the first tuple to find out what the ranking should be.

We can simply do this for the rest of our table, provided that we actually have our helper functions done correctly.


---
# Actual code
Let's write our helper functions, starting with `checkFrequencies`
#### checkFrequencies (helper function)
```
let checkFrequencies = (hand) => {
  // create an object to store frequencies
  let hashMap = {};
  // loop through each card, if the card exists, add it to it's frequency, if not, set it to 1
  hand.forEach((card) => {
    let cardNumber =  Number(card.slice(0, card.length - 1))
    hashMap[cardNumber] ? hashMap[cardNumber] += 1 : hashMap[cardNumber] = 1;
  })

  // convert the object to an array of tuples
  let frequencies = Object.entries(hashMap);

  // sort the frequencies by it's ... frequencies from max to min and return it
  return frequencies.sort((a,b) => b[1] - a[1]);

  // that should return an array of tuples in this format [[10, 4],[1, 1]]
}
```


## checkRange (helper function)
 * The idea of this solution is to create an array consisting solely of the card numbers and sort it, that way we can simply iterate through each number and see if each element is consecutive
* One issue with this solution are the Aces, since they can work both ways (1,2,3,4,5) || (10,11,12,13,1)
*  My approach is to create two arrays and reuse our iteration, one where Ace is represented by 1, and the other were it is represented by 14
*  Then we can simply run both arrays using the same rules in our iteration, if any of the arrays return true, we can return true for the whole function
```
let checkRange = (hand) => {
  // create a new array of consisting of just the card numbers by slicing off the suit (last character)
  let cardNumbers = hand.map(card => Number(card.slice(0, card.length - 1)));
  // sort the arary
  cardNumbers.sort((a,b) => a-b);
  // create a copy of the array
  let cardNumbersWithAce = cardNumbers.slice();
  // if the array has an Ace, take out the 1 and replace it with the 14, push the 14 to the end so that it's still sorted
  if (cardNumbers.includes(1)) {
    cardNumbersWithAce.shift();
    cardNumbersWithAce.push(14);
  }
  // just using another helper function for modularity.
cardNumbers = isOrdered(cardNumbers);
cardNumbersWithAce = isOrdered(cardNumbersWithAce);

// if any one of the two arrays return true, our hand is a range
return cardNumbers || cardNumbersWithAce
}
```

```
let isOrdered = (array) => {
// iterate through the array, if at any point after the first card the numbers aren't consecutive, return false
return array.every((card, i) => {
  if (i === 0) return true;
  return card === array[i - 1] + 1;
})
}
```



## checkSuited (helper function)

This one is fairly simple and there are a lot of different ways you can implement this

```
let checkSuited = (hand) => {
  // get suit from first card
  let suit =  hand[0][hand[0].length - 1];
  // loop through rest of cards...
  for (let i = 1; i < hand.length; i++) {
    let currentSuit = hand[i][hand[i].length - 1];
    // if at any point suit is different, return false
    if (suit !== currentSuit) {
      return false
    }
  }
  return true;
}
```
