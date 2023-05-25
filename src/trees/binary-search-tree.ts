export type BinaryTreeNode<T> = {
    value: T;
    left: BinaryTreeNode<T> | null;
    right: BinaryTreeNode<T> | null;
};

export class BinarySearchTree<T> {
    public root: BinaryTreeNode<T> | null = null;

    constructor(private comparator: (parent: BinaryTreeNode<T> | null, value: T) => boolean, values?: T[]) {
        if (values) {
            for (let v of values) {
                this.insert(v);
            }
        }
    }

    public insert(value: T): void {
        const newNode: BinaryTreeNode<T> = this.createNode(value);
        if (!this.root) {
            this.root = newNode;
            return;
        }

        this.insertNode(this.root, newNode);
    }

    private insertNode(parent: BinaryTreeNode<T>, child: BinaryTreeNode<T>): void {
        if (this.comparator(parent, child.value)) {
            if (parent.left === null) {
                parent.left = child;
            } else {
                this.insertNode(parent.left, child);
            }
        } else {
            if (parent.right === null) {
                parent.right = child;
            } else {
                this.insertNode(parent.right, child);
            }
        }
    }

    public find(value: T): BinaryTreeNode<T> | null {
        if (!this.root || this.root.value === value) return this.root;

        return this.findNode(this.root, value);
    }

    private findNode(parent: BinaryTreeNode<T>, value: T): BinaryTreeNode<T> | null {
        if (this.comparator(parent, value)) {
            if (!parent.left || parent.left.value === value) return parent.left;
            return this.findNode(parent.left, value);
        } else {
            if (!parent.right || parent.right.value === value) return parent.right;
            return this.findNode(parent.right, value);
        }
    }

    public remove(value: T): BinaryTreeNode<T> | null {
        if (!this.root) {
            return null;
        }

        if (this.root.value === value) {
            const node = this.root;
            this.root = this.getRightMostNode(this.root);
            return node;
        }

        return this.removeNode(this.root, value);
    }

    private removeNode(parent: BinaryTreeNode<T>, value: T): BinaryTreeNode<T> | null {
        if (!parent.left && !parent.right) return null;

        if (this.comparator(parent, value)) {
            if (!parent.left) return null;

            if (parent.left.value === value) {
                const removedNode = parent.left;
                const rightMostNode = this.getRightMostNode(parent);
                rightMostNode.left = removedNode.left;
                rightMostNode.right = removedNode.right;
                parent.left = rightMostNode;
                return removedNode;
            }

            return this.removeNode(parent.left, value);
        } else {
            if (!parent.right) return null;

            if (parent.right.value === value) {
                const removedNode = parent.right;
                const rightMostNode = this.getRightMostNode(parent);
                rightMostNode.left = removedNode.left;
                rightMostNode.right = removedNode.right;
                parent.right = rightMostNode;
                return removedNode;
            }

            return this.removeNode(parent.right, value);
        }
    }

    private getRightMostNode(parent: BinaryTreeNode<T>): BinaryTreeNode<T> {
        if (parent.right) return this.getRightMostNode(parent.right);

        if (parent.left) return this.getRightMostNode(parent.left);

        return parent;
    }

    private createNode(value: T): BinaryTreeNode<T> {
        return {
            value: value,
            left: null,
            right: null,
        };
    }
}
