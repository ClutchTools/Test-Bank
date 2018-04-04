var addTwoLists = function(l1, l2) {

    let newList = [];
    let carryOver = 0;

    let node1 = l1.head;
    let node2 = l2.head;

    while(node1 !== null || node2 !== null){
        let sum = 0
        if(node1){
            sum += node1.val
            node1 = node1.next
        }
        if(node2){
            sum += node2.val
            node2 = node2.next
        }
        if(carryOver > 0){
            sum += carryOver
            carryOver = 0
        }
        if(sum > 9){
          carryOver = Math.floor(sum/10)
        }
        newList.push(sum%10)
    }
    if(carryOver > 0){
        newList.push(carryOver)
    }
    return newList
};
