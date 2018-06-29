var inorderSuccessor = function(tree, p, flag = false) {
    let test;
    if(flag){
        if(tree.left){
            return inorderSuccessor(tree.left, p, true)
        } else{
            return tree.val
        }
    } else{
      if(p.val === tree.val){
          if(tree.right){
            return inorderSuccessor(tree.right, p, true)  
          } else{
              return null
          }
      } else if( p.val < tree.val){
        //go left
          test = inorderSuccessor(tree.left, p)
          if(test === null){
              return tree.val
          } else{
              if(test-p.val < tree.val-p.val){
                  return test
              } else{
                  return tree.val
              }
          }
      } else{
        //go right
        test = inorderSuccessor(tree.right, p)
        return test
      }
    }    
};

// Time complexity of this solution is O(D) with D equal to the depth of the tree