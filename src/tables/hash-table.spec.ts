import { describe, it, expect } from 'vitest';
import { HashTable } from './hash-table';

describe("HashTable", () => {
    describe("#insert", () => {
        it("should insert value", () => {
            const table = new HashTable<number>();
            const hash = table.insert(1);
            expect(table.at(hash)).toBe(1);
        });
    });

    describe("#remove", () => {
        it("should remove value", () => {
            const table = new HashTable<number>();
            const hash = table.insert(1);
            table.remove(hash);
            expect(table.at(hash)).toBeUndefined();
        });

        it("should remove value when value is object", () => {
            const table = new HashTable<{ id: number }>();
            const hash = table.insert({ id: 1 });
            table.remove(hash);
            expect(table.at(hash)).toBeUndefined();
        });

        it("should return value", () => {
            const table = new HashTable<number>();
            const hash = table.insert(1);
            expect(table.remove(hash)).toBe(1);
        });

        it("should return undefined when value not found", () => {
            const table = new HashTable<number>();
            expect(table.remove("1")).toBeUndefined();
        });
    });

    describe("#removeValue", () => {
        it("should remove value", () => {
            const table = new HashTable<number>();
            const hash = table.insert(1);
            table.removeValue(1);
            expect(table.at(hash)).toBeUndefined();
        });

        it("should remove value when value is object", () => {
            const table = new HashTable<{ id: number }>();
            const hash = table.insert({ id: 1 });
            table.removeValue({ id: 1 });
            expect(table.at(hash)).toBeUndefined();
        });

        it("should return value", () => {
            const table = new HashTable<number>();
            const hash = table.insert(1);
            expect(table.removeValue(1)).toBe(1);
        });

        it("should return undefined when value not found", () => {
            const table = new HashTable<number>();
            expect(table.removeValue(1)).toBeUndefined();
        });
    });

    describe("#at", () => {
        it("should return value", () => {
            const table = new HashTable<number>();
            const hash = table.insert(1);
            expect(table.at(hash)).toBe(1);
        });

        it("should return undefined when value not found", () => {
            const table = new HashTable<number>();
            expect(table.at("1")).toBeUndefined();
        });
    });
});