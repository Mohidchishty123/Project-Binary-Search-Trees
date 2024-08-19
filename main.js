// Node class
class Node {
    constructor(data) {
      this.data = data;
      this.left = null;
      this.right = null;
    }
  }
  
  // Tree class
  class Tree {
    constructor(array) {
      this.root = this.buildTree(array);
    }
  
    // Build a balanced BST from a sorted array without duplicates
    buildTree(array) {
      array = [...new Set(array)].sort((a, b) => a - b); // Remove duplicates and sort
  
      const build = (arr) => {
        if (arr.length === 0) return null;
        const mid = Math.floor(arr.length / 2);
        const node = new Node(arr[mid]);
        node.left = build(arr.slice(0, mid));
        node.right = build(arr.slice(mid + 1));
        return node;
      };
  
      return build(array);
    }
  
    // Insert a value into the BST
    insert(value, node = this.root) {
      if (node === null) {
        return new Node(value);
      }
  
      if (value < node.data) {
        node.left = this.insert(value, node.left);
      } else if (value > node.data) {
        node.right = this.insert(value, node.right);
      }
  
      return node;
    }
  
    // Delete a value from the BST
    deleteItem(value, node = this.root) {
      if (node === null) return node;
  
      if (value < node.data) {
        node.left = this.deleteItem(value, node.left);
      } else if (value > node.data) {
        node.right = this.deleteItem(value, node.right);
      } else {
        // Node with only one child or no child
        if (node.left === null) return node.right;
        if (node.right === null) return node.left;
  
        // Node with two children: Get the inorder successor (smallest in the right subtree)
        node.data = this.minValue(node.right);
  
        // Delete the inorder successor
        node.right = this.deleteItem(node.data, node.right);
      }
  
      return node;
    }
  
    minValue(node) {
      let current = node;
      while (current.left !== null) {
        current = current.left;
      }
      return current.data;
    }
  
    // Find a value in the BST
    find(value, node = this.root) {
      if (node === null || node.data === value) return node;
  
      if (value < node.data) {
        return this.find(value, node.left);
      } else {
        return this.find(value, node.right);
      }
    }
  
    // Level Order Traversal (BFS)
    levelOrder(callback) {
      if (!callback) throw new Error("Callback function is required.");
  
      const queue = [this.root];
  
      while (queue.length > 0) {
        const node = queue.shift();
        callback(node);
        if (node.left !== null) queue.push(node.left);
        if (node.right !== null) queue.push(node.right);
      }
    }
  
    // InOrder Traversal (DFS)
    inOrder(callback, node = this.root) {
      if (!callback) throw new Error("Callback function is required.");
  
      if (node !== null) {
        this.inOrder(callback, node.left);
        callback(node);
        this.inOrder(callback, node.right);
      }
    }
  
    // PreOrder Traversal (DFS)
    preOrder(callback, node = this.root) {
      if (!callback) throw new Error("Callback function is required.");
  
      if (node !== null) {
        callback(node);
        this.preOrder(callback, node.left);
        this.preOrder(callback, node.right);
      }
    }
  
    // PostOrder Traversal (DFS)
    postOrder(callback, node = this.root) {
      if (!callback) throw new Error("Callback function is required.");
  
      if (node !== null) {
        this.postOrder(callback, node.left);
        this.postOrder(callback, node.right);
        callback(node);
      }
    }
  
    // Calculate the Height of a Node
    height(node) {
      if (node === null) return -1;
  
      const leftHeight = this.height(node.left);
      const rightHeight = this.height(node.right);
  
      return Math.max(leftHeight, rightHeight) + 1;
    }
  
    // Calculate the Depth of a Node
    depth(node, current = this.root, depth = 0) {
      if (current === null) return -1;
  
      if (node.data === current.data) return depth;
  
      if (node.data < current.data) {
        return this.depth(node, current.left, depth + 1);
      } else {
        return this.depth(node, current.right, depth + 1);
      }
    }
  
    // Check if the Tree is Balanced
    isBalanced(node = this.root) {
      if (node === null) return true;
  
      const leftHeight = this.height(node.left);
      const rightHeight = this.height(node.right);
  
      if (Math.abs(leftHeight - rightHeight) > 1) return false;
  
      return this.isBalanced(node.left) && this.isBalanced(node.right);
    }
  
    // Rebalance the Tree
    rebalance() {
      const values = [];
      this.inOrder((node) => values.push(node.data));
      this.root = this.buildTree(values);
    }
  
    // Utility function to print the tree (already provided)
    prettyPrint(node = this.root, prefix = "", isLeft = true) {
      if (node === null) return;
  
      if (node.right !== null) {
        this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
      }
      console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
      if (node.left !== null) {
        this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
      }
    }
  }
  
  // Driver Script
  // Function to generate an array of random numbers
  function randomArray(size, max = 100) {
    return Array.from({ length: size }, () => Math.floor(Math.random() * max));
  }
  
  // Create a binary search tree from an array of random numbers < 100
  const randomNumbers = randomArray(15);
  const tree = new Tree(randomNumbers);
  
  // Confirm that the tree is balanced
  console.log("Is the tree balanced?", tree.isBalanced());
  
  // Print out all elements in level, pre, post, and in order
  console.log("Level Order:");
  tree.levelOrder(node => console.log(node.data));
  
  console.log("In Order:");
  tree.inOrder(node => console.log(node.data));
  
  console.log("Pre Order:");
  tree.preOrder(node => console.log(node.data));
  
  console.log("Post Order:");
  tree.postOrder(node => console.log(node.data));
  
  // Unbalance the tree by adding several numbers > 100
  tree.insert(101);
  tree.insert(150);
  tree.insert(200);
  tree.insert(250);
  tree.insert(300);
  
  // Confirm that the tree is unbalanced
  console.log("Is the tree unbalanced after insertions?", !tree.isBalanced());
  
  // Rebalance the tree
  tree.rebalance();
  
  // Confirm that the tree is balanced
  console.log("Is the tree balanced after rebalancing?", tree.isBalanced());
  
  // Print out all elements in level, pre, post, and in order
  console.log("Level Order after rebalancing:");
  tree.levelOrder(node => console.log(node.data));
  
  console.log("In Order after rebalancing:");
  tree.inOrder(node => console.log(node.data));
  
  console.log("Pre Order after rebalancing:");
  tree.preOrder(node => console.log(node.data));
  
  console.log("Post Order after rebalancing:");
  tree.postOrder(node => console.log(node.data));
  