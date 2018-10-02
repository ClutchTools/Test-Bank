const isValidBST = function(root) {
  if(!root){
      return true
  }
  let compare;
  let flag = true
  const inOrderTrav = (node) => {
    if(node.left){
      inOrderTrav(node.left)
    }
    if(compare !== undefined){
      if(compare < node.val){
        compare = node.val
      } else{
        flag = false
        compare = Infinity
      }
    }else{
      compare = node.val
    }
    if(node.right){
      inOrderTrav(node.right)
    }
  }
  inOrderTrav(root)
  return flag

};