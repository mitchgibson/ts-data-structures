import { describe, it, expect } from "vitest";
import { BinarySearchTree } from "./binary-search-tree";

describe("BinarySearchTree", () => {

    describe("#insert", () => {
        it("should insert root node", () => {
            const tree = new BinarySearchTree<number>((parent, value) => !!parent && parent.value > value);
            tree.insert(1);
            expect(tree.root?.value).toEqual(1);
        });

        it("should insert left node", () => {
            const tree = new BinarySearchTree<number>((parent, value) => !!parent && parent.value > value);
            tree.insert(2);
            tree.insert(1);
            expect(tree.root?.left?.value).toEqual(1);
        });

        it("should insert right node", () => {
            const tree = new BinarySearchTree<number>((parent, value) => !!parent && parent.value > value);
            tree.insert(1);
            tree.insert(2);
            expect(tree.root?.right?.value).toEqual(2);
        });
    });

    describe("#remove", () => {
        it("should remove node", () => {
            const tree = new BinarySearchTree<number>((parent, value) => {
                return !!parent && parent.value > value
            }, [8, 4, 10, 3, 6, 9, 12]);
            tree.remove(4);
            expect(tree.root!.left!.value).toEqual(12);
        });

        it("should remove root node", () => {
            const tree = new BinarySearchTree<number>((parent, value) => {
                return !!parent && parent.value > value
            }, [8, 4, 10, 3, 6, 9, 12]);
            tree.remove(8);
            expect(tree.root!.value).toEqual(12);
        });
    });

    describe("#find", () => {
        it("should find node", () => {
            const tree = new BinarySearchTree<number>((parent, value) => {
                return !!parent && parent.value > value
            }, [8, 4, 10, 3, 6, 9, 12]);
            const node = tree.find(9);
            expect(node!.value).toEqual(9);
        });

        it("should return null when node not found", () => {
            const tree = new BinarySearchTree<number>((parent, value) => {
                return !!parent && parent.value > value
            }, [8, 4, 10, 3, 6, 9, 12]);
            const node = tree.find(13);
            expect(node).toBeNull();
        });
    });
});