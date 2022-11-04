class Node{
    constructor(value){
        this.value = value;
        this.left = null;
        this.right = null;
    }
}
class BinaryTreeSearch{
    constructor(){
        this.root = null;
    }
    
    insertClienteIntoTreeP(root,value) {
        console.log(root);
        if (root) {
            if (parseInt(value.CNPJCPF) > parseInt(this.root.value.CNPJCPF)) {
                this.insertClienteIntoTree(this.root.right, value);
            }
            else {
                this.insertClienteIntoTree(this.root.left, value);
            }
        }
        else {
            let node = new Node(value);
            this.root = node;
            return;
        }
    }
    insertClienteIntoTree(value){
        this.insertClienteIntoTreeP(this.root, value);
    }
    inOrder(){
        this.inOrder2(this.root);
    }
    inOrder2(node){
        if(node == null){
            return;
        }

        this.inOrder2(node.left);
        console.log(node.value);
        this.inOrder2(node.right);
    }
    
}

tree = new BinaryTreeSearch();
e1 = {CNPJCPF: '51651651605'};
e2 = {CNPJCPF: '98461321654'};
tree.insertClienteIntoTree(e1);
tree.insertClienteIntoTree(e2);
tree.inOrder();



//export default BinaryTreeSearch;