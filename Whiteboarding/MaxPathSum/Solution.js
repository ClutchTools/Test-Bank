var maxPathSum = function(root) {
    if(root === null) return;
    let total = root.val;
    const count = (node) => {
      let left = 0,right = 0;
      if(node.left !== null){
        left = count(node.left)
      }
      if(node.right !== null){
        right = count(node.right)
      }
      total = Math.max(total, node.val+left+right, node.val+left, node.val+right)
      return Math.max(node.val, node.val+left, node.val+right);
    }
    count(root)
    return total
    };