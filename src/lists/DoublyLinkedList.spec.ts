import { describe, it, expect } from "vitest";
import { DoublyLinkedList, DoublyLinkedListNode } from "./DoublyLinkedList";

describe("Linked List", () => {

    it("should set next value", () => {
        const list = new DoublyLinkedList<number>([1, 2, 3]);
        expect(list.head?.next?.value).toBe(2);
    });

    it("should set prev value", () => {
        const list = new DoublyLinkedList<number>([1, 2, 3]);
        expect(list.head?.next?.prev?.value).toBe(1);
    });

    describe('#append', () => {
        it("should instantiate with provide values", () => {
            const list = new DoublyLinkedList<number>([1, 2, 3]);
            let node: DoublyLinkedListNode<number> | null = list.head;
            expect(node?.value).toEqual(1);
            node = node?.next || null;
            expect(node?.value).toEqual(2);
            node = node?.next || null;
            expect(node?.value).toEqual(3);
        });
    
        it("should append node to head when head not set", () => {
            const list = new DoublyLinkedList<number>();
            list.append(4);
            expect(list.head!.value).toBe(4);
        });
    
        it("should append head.next node", () => {
            const list = new DoublyLinkedList<number>([1]);
            list.append(2);
            expect(list.head!.next!.value).toBe(2);
        });
    
        it("should append a node", () => {
            const list = new DoublyLinkedList<number>([1,2]);
            list.append(3);
            expect(list.head!.next!.next!.value).toBe(3);
        });
    });

    describe("#prepend", () => {
        it("should add to head when head not set", () => {
            const list = new DoublyLinkedList<number>();
            list.prepend(1);
            expect(list.head!.value).toBe(1);
        });

        it("should prepend a node", () => {
            const list = new DoublyLinkedList<number>([1]);
            list.prepend(2);
            expect(list.head!.value).toBe(2);
            expect(list.head!.next!.value).toBe(1);
        });
    });

    describe('#clear', () => {
        it("should clear nodes", () => {
            const list = new DoublyLinkedList<number>([1,2,3]);
            list.clear();
            expect(list.head).toBeNull();
        });
    });

    describe("#pick", () => {
        it("should return item at index 2", () => {
            const list = new DoublyLinkedList<number>([1,2,3,4,5]);
            const node = list.pick(2);
            expect(node!.value).toEqual(3);
        });

        it("should return null when node at index not found", () => {
            const list = new DoublyLinkedList<number>([1,2,3,4,5]);
            const node = list.pick(6);
            expect(node).toBeNull();
        });
    });

    describe("removeAt", () => {
        it("should remove node at index 2", () => {
            const list = new DoublyLinkedList<number>([1,2,3,4,5]);
            list.removeAt(2);
            expect(list.head!.next!.next!.value).toEqual(4);
        });
    });

    describe("find", () => {
        it("should return node when match found", () => {
            const list = new DoublyLinkedList<number>([1,2,3,4,5]);
            const node = list.find(3);
            expect(node!.value).toEqual(3);
        });

        it("should return null when match not found", () => {
            const list = new DoublyLinkedList<number>([1,2,3,4,5]);
            const node = list.find(6);
            expect(node).toBeNull();
        });
    });

    describe("toArray", () => {
        it("should return array of values", () => {
            const list = new DoublyLinkedList<number>([1,2,3,4,5]);
            const arr = list.toArray();
            expect(arr).toEqual([1,2,3,4,5]);
        });

        it("should return empty array when no nodes", () => {
            const list = new DoublyLinkedList<number>();
            const arr = list.toArray();
            expect(arr).toEqual([]);
        });
    });
});
