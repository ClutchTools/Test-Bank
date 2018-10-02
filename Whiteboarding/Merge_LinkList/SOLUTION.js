function mergeLinkedLists(LinkedListA, LinkedListB) => {
	let A = LinkedListA.head
	let B = LinkedListB.head
	var mergedList = new LinkedList()
	while(A !== null || B !== null){
		let sum = 0
		if(A !== null){
			sum += A.value
			A = A.next
		}
		if(B !== null){
			sum += B.value
			B = B.next
		}
		mergedList.addToTail(sum)
	}
	return mergedList
}

//Linked List Constructor
var LinkedList = function() {
  var list = {};
  list.head = null;
  list.tail = null;

  list.addToTail = function(value) {

    var newTail = Node(value);

    if (!list.head) {
      list.head = newTail;
    }

    if (list.tail) {
      list.tail.next = newTail;
    }

    list.tail = newTail;
    };

  list.removeHead = function() {

    if (list.head === null) {
      return null;
    }

    var currentHead = list.head;
    list.head = list.head.next;

    return currentHead.value;
      };

  return list;
};

//Node Constructor
var Node = function(value) {
  var node = {};

  node.value = value;
  node.next = null;

  return node;
};

