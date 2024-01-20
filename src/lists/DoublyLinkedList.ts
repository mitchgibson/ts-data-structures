export type DoublyLinkedListNode<T> = {
    value: T;
    next: DoublyLinkedListNode<T> | null;
    prev: DoublyLinkedListNode<T> | null;
};

export class DoublyLinkedList<T> {
    public head: DoublyLinkedListNode<T> | null = null;

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

    public append(value: T): DoublyLinkedListNode<T> {
        if (!this.head) {
            this.head = this.createNode(value);
            return this.head;
        }

        if (!this.head.next) {
            const node = this.createNode(value, this.head);
            this.head.next = node;
            return node;
        }

        let cur: DoublyLinkedListNode<T> | null = this.head.next;

        while (cur) {
            if (!cur.next) {
                const node = this.createNode(value, cur);
                cur.next = node;
                return node;
            }
            cur = cur.next;
        }

        return cur;
    }

    public prepend(value: T): DoublyLinkedListNode<T> {
        const node = this.createNode(value, null, this.head);
        this.head = node;
        return this.head;
    }

    public pick(index: number): DoublyLinkedListNode<T> | null {
        if (!this.head) {
            return null;
        }

        let pos: DoublyLinkedListNode<T> | null = this.head;
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

    public removeAt(index: number): DoublyLinkedListNode<T> | null {
        if (!this.head) {
            return null;
        }

        if (index === 0) {
            const node = this.head;
            this.head = this.head.next;
            return node;
        }

        let prev: DoublyLinkedListNode<T> | null = this.pick(index - 1);
        if (prev && prev.next) {
            const node = prev.next;
            node.prev = prev.prev;
            prev.next = prev.next.next;
            return node;
        }

        return null;
    }

    public find(value: T, startingNode: DoublyLinkedListNode<T> | null = this.head): DoublyLinkedListNode<T> | null {
        if (!startingNode) return null;

        if (startingNode.value === value) return startingNode;

        const reducer = (v: T, node: DoublyLinkedListNode<T> | null) => {
            return node?.value === value ? node : this.find(v, node!.next);
        };

        return reducer(value, startingNode);
    }

    public toArray(): Array<T> {
        if (!this.head) {
            return [];
        }

        const arr: T[] = [];

        let node: DoublyLinkedListNode<T> | null = this.head;
        while (node) {
            arr.push(node.value);
            node = node.next;
        }

        return arr;
    }

    private createNode(value: T, prev: DoublyLinkedListNode<T> | null = null, next: DoublyLinkedListNode<T> | null = null): DoublyLinkedListNode<T> {
        return {
            value: value,
            next: next,
            prev: prev
        };
    }
}
