class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}
class BinaryTreeSearch {
    constructor() {
        this.root = null;
    }

    insertClienteIntoTreeP(root, value) {
        if (root == null) {
            root = new Node(value);
            return root;
        }
        if (parseInt(value.CNPJCPF) > parseInt(root.value.CNPJCPF)) {
            root.right = this.insertClienteIntoTreeP(root.right, value);
        }
        else if (parseInt(value.CNPJCPF) < parseInt(root.value.CNPJCPF)) {
            root.left = this.insertClienteIntoTreeP(root.left, value);
        }
        else{
            root = this.addFilialR(root, root.value.CNPJCPF, value.FILIAL);
            return root;
        }
        return root;
    }
    insertClienteIntoTree(value) {
        this.root = this.insertClienteIntoTreeP(this.root, value);
    }
    inOrder() {
        this.inOrder2(this.root);
    }
    inOrder2(node) {
        if (node == null) {
            return;
        }

        this.inOrder2(node.left);
        console.log(node.value);
        this.inOrder2(node.right);
    }
    treeSearchP(root, value) {
        if (parseInt(value.CNPJCPF) > parseInt(root.value.CNPJCPF)) {
            return this.treeSearchP(root.right, value);
        }
        else if (parseInt(value.CNPJCPF) < parseInt(root.value.CNPJCPF)) {
            return this.treeSearchP(root.left, value);
        }
        else {
            return root.value;
        }
    }
    treeSearch(value) {
        return this.treeSearchP(this.root, value);
    }
    removeLeaf(root) {
        if (root.left == null && root.right == null) {
            return root = null;
        }
        else {
            console.log("Erro, arvore vazia");
            return -999999999999999;
        }
    }
    removeOneChild(root) {
        if (root.right == null) {
            return root = root.left;
        }
        else if (root.left == null) {
            return root = root.right;
        }
        else {
            console.log("nó não tem somente 1 filho")
            return -999999999999999;
        }
    }
    lowestRightSubtree(root) {
        if (root.left != null && root.right != null) {
            let aux = root.right;
            while (aux.left != null) {
                aux = aux.left;
            }
            return aux;
        }
        else {
            console.log("Erro, nó raiz não tem dois filhos");
            return -999999999999999;
        }
    }
    modLowestLeftSubTree(root) {
        if (root.left == null) {
            root = root.right;
            return root;
        }
        root.left = this.modLowestLeftSubTree(root.left);
        return root;
    }
    removeNodeR(root, value) {
        if (root != null) {
            if (parseInt(value.CNPJCPF) > parseInt(root.value.CNPJCPF)) {
                root.right = this.removeNodeR(root.right, value);
            }
            else if (parseInt(value.CNPJCPF) < parseInt(root.value.CNPJCPF)) {
                root.left = this.removeNodeR(root.left, value);
            }
            else {
                if (root.left == null && root.right == null) {
                    return this.removeLeaf(root);
                }
                else if (root.left == null || root.right == null) {
                    return this.removeOneChild(root);
                }
                else {
                    root.value = this.lowestRightSubtree(root).value;
                    root.right = this.modLowestLeftSubTree(root.right);
                    return root;
                }
            }
            return root;
        }
        else {
            console.log("Valor não encontrado na Árvore");
            return root;
        }

    }
    removeNode(value) {
        this.root = this.removeNodeR(this.root, value);
    }
    addFilialR(root, cnpjcpf, newValue) {
        if (parseInt(cnpjcpf.CNPJCPF) > parseInt(root.value.CNPJCPF)) {
            root.right = this.addFilialR(root.right, cnpjcpf, newValue);
        }
        else if (parseInt(cnpjcpf.CNPJCPF) < parseInt(root.value.CNPJCPF)) {
            root.left = this.addFilialR(root.left, cnpjcpf, newValue);
        }
        else {
            root.value.FILIAL += ", " + newValue;
            return root;
        }
        return root;
    }
    addFilial(cnpjcpf, value) {
        this.root = this.addFilialR(this.root, cnpjcpf, value);
    }
    getSizeR(root) {
        if (root == null) {
            return 0;
        }
        return 1 + this.getSizeR(root.left) + this.getSizeR(root.right);
    }
    getSize() {
        return this.getSizeR(this.root);
    }
}

module.exports = { BinaryTreeSearch };