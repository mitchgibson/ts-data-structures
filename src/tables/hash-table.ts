export class HashTable<T> {
    public table: { [key: string]: T } = {};

    public insert(value: T): string {
        const hash = this.hashCode(value);
        this.table[hash] = value;
        return hash;
    }

    public remove(hash: string): T {
        const value: T = this.table[hash];
        delete this.table[hash];
        return value;
    }

    public removeValue(value: T): T {
        const hash = this.hashCode(value);
        return this.remove(hash);
    }

    public at(hash: string): T {
        return this.table[hash];
    }

    private hashCode(value: T): string {
        const str = JSON.stringify(value);
        const hashNum = [...str].reduce((hash, c) => (Math.imul(31, hash) + c.charCodeAt(0)) | 0, 0);
        return "" + hashNum;
    }
}
