
export class StackFifo<T> {

    constructor(private stack: T[] = []) {}

    public push(value:T): void {
        this.stack.push(value);
    }

    public pop(): T | undefined {
        if(this.isEmpty()) return undefined;
        const popped = this.stack.splice(0, 1);
        return popped[0];
    }

    public peek(): T | undefined {
        if(this.isEmpty()) return undefined;
        return this.stack[0];
    }

    public isEmpty():boolean {
        return this.stack.length === 0;
    }

    public size():number {
        return this.stack.length;
    }
}