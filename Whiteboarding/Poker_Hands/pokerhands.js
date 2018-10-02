let pokerHands = (hand) => {

  let isSuited = checkSuited(hand);
  let isRange = checkRange(hand);
  let frequencies = checkFrequencies(hand);

  if (isSuited && isRange) {
    if (frequencies[4][0] === '13' && frequencies[0][0] === '1') {
      return 'Royal Flush';
    } else {
      return 'Straight Flush';
    }
  }

  if (frequencies.length === 2) {
    if (frequencies[0][1] === 4) {
      return 'Four of a Kind';
    } else {
      return 'Full House';
    }
  }

  if (isSuited && !isRange) return 'Flush';
  if (isRange && !isSuited) return 'Straight';

  if (frequencies.length === 3) {
    if (frequencies[0][1] === 3) {
      return 'Three of a Kind';
    } else {
      return 'Two Pair';
    }
  }

  if (frequencies.length === 4) return 'One Pair';
  return 'High Card';
}





let checkSuited = (hand) => {
  let suit =  hand[0][hand[0].length - 1];
  for (let i = 1; i < hand.length; i++) {
    let currentSuit = hand[i][hand[i].length - 1];
    if (suit !== currentSuit) {
      return false
    }
  }
  return true;
}

let checkRange = (hand) => {
  let cardNumbers = hand.map(card => Number(card.slice(0, card.length - 1)));
  cardNumbers.sort((a,b) => a-b);
  let cardNumbersWithAce = cardNumbers.slice();
  if (cardNumbers.includes(1)) {
    cardNumbersWithAce.shift();
    cardNumbersWithAce.push(14);
  }
  cardNumbers = isOrdered(cardNumbers);
  cardNumbersWithAce = isOrdered(cardNumbersWithAce);
  return cardNumbers || cardNumbersWithAce
}

let isOrdered = (array) => {
  return array.every((card, i) => {
    if (i === 0) return true;
    return card === array[i - 1] + 1;
  })
}


let checkFrequencies = (hand) => {
  let hashMap = {};
  hand.forEach((card) => {
    let cardNumber =  Number(card.slice(0, card.length - 1))
    hashMap[cardNumber] ? hashMap[cardNumber] += 1 : hashMap[cardNumber] = 1;
  });

  let frequencies = Object.entries(hashMap);
  return frequencies.sort((a,b) => b[1] - a[1]);

}
