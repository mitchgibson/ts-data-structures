
export class StackLifo<T> {

    constructor(private stack:T[] = []) {}

    public push(value:T): void {
        this.stack.push(value);
    }

    public pop(): T | undefined {
        if(this.isEmpty()) return undefined;
        const popped = this.stack.splice(this.stack.length - 1, 1);
        return popped[0];
    }

    public peek(): T | undefined {
        if(this.isEmpty()) return undefined;
        return this.stack[this.stack.length - 1];
    }

    public isEmpty():boolean {
        return this.stack.length === 0;
    }

    public size():number {
        return this.stack.length;
    }
}