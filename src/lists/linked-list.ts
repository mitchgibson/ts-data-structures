export type LinkedListNode<T> = {
    value: T;
    next: LinkedListNode<T> | null;
};

export class LinkedList<T> {
    public head: LinkedListNode<T> | null = null;

    constructor(values?: Array<T>) {
        if (values) {
            values.forEach((v) => {
                this.append(v);
            });
        }
    }

    public clear(): void {
        this.head = null;
    }

    public append(value: T): LinkedListNode<T> {
        if (!this.head) {
            this.head = this.createNode(value);
            return this.head;
        }

        if (!this.head.next) {
            const node = this.createNode(value);
            this.head.next = node;
            return node;
        }

        let cur: LinkedListNode<T> | null = this.head.next;

        while (cur) {
            if (!cur.next) {
                const node = this.createNode(value);
                cur.next = node;
                return node;
            }
            cur = cur.next;
        }

        return cur;
    }

    public prepend(value: T): LinkedListNode<T> {
        const node = this.createNode(value, this.head);
        this.head = node;
        return this.head;
    }

    public pick(index: number): LinkedListNode<T> | null {
        if (!this.head) {
            return null;
        }

        let pos: LinkedListNode<T> | null = this.head;
        let i: number = 0;

        while (pos) {
            if (i === index) {
                return pos;
            }
            pos = pos.next;
            i++;
        }

        return pos;
    }

    public removeAt(index: number): LinkedListNode<T> | null {
        if (!this.head) {
            return null;
        }

        if (index === 0) {
            const node = this.head;
            this.head = this.head.next;
            return node;
        }

        let prev: LinkedListNode<T> | null = this.pick(index - 1);
        if (prev && prev.next) {
            const node = prev.next;
            prev.next = prev.next.next;
            return node;
        }

        return null;
    }

    public find(value: T, startingNode: LinkedListNode<T> | null = this.head): LinkedListNode<T> | null {
        if (!startingNode) return null;

        if (startingNode.value === value) return startingNode;

        const reducer = (v: T, node: LinkedListNode<T> | null) => {
            return node?.value === value ? node : this.find(v, node!.next);
        };

        return reducer(value, startingNode);
    }

    public toArray(): Array<T> {
        if (!this.head) {
            return [];
        }

        const arr: T[] = [];

        let node: LinkedListNode<T> | null = this.head;
        while (node) {
            arr.push(node.value);
            node = node.next;
        }

        return arr;
    }

    private createNode(value: T, next: LinkedListNode<T> | null = null): LinkedListNode<T> {
        return {
            value: value,
            next: next,
        };
    }
}
