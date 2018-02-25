class Person {
  constructor(id) {
    this.id = id;
    this.friends = [];
  }
  addFriend(friend) {
    this.friends.push(friend);
  }
}

const intersects = function(setA, setB) {
  if (setA.size > setB.size) {
    // Iterate the smaller set for efficiency.
    [setA, setB] = [setB, setA];
  }

  for (var elem of setA) {
    if (setB.has(elem)) {
      return true;
    }
  }
  return false;
};

const befriend = function(personA, personB) {
  personA.addFriend(personB);
  personB.addFriend(personA);
};

const getFriends = function(people) {
  const allFriends = new Set();
  people.forEach((person) => {
    person.friends.forEach((friend) => {
      allFriends.add(friend);
    });
  });
  return allFriends;
};

const calculateDegreesOfSeparation = function(personA, personB) {
  if (personA === personB) {
    return 0;
  }

  let friendsA = new Set([personA]);
  let friendsB = new Set([personB]);
  let depth = 1;
  while (friendsA.size > 0 && friendsB.size > 0) {
    friendsA = getFriends(friendsA);
    if (intersects(friendsA, friendsB)) {
      return depth;
    }
    depth += 1;

    friendsB = getFriends(friendsB);
    if (intersects(friendsA, friendsB)) {
      return depth;
    }
    depth += 1;
  }
  return -1;
};