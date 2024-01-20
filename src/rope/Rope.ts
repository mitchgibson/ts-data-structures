export type RopeOptions = {
  splitThreshold: number;
  joinThreshold: number;
  rebalanceThreshold: number;
};

export class Rope {
  public left: Rope | null = null;
  public right: Rope | null = null;
  public parent: Rope | null = null;
  public length: number;
  public value: string;

  private _options: RopeOptions;

  constructor(value: string = "", parent: Rope | null = null, options: RopeOptions) {
    this._options = options;
    this.parent = parent;
    this.value = value;
    this.length = value.length;
    if (this.value) {
    }
    this.adjust();
  }

  public adjust(): void {
    if (!!this.value) {
      if (this.value.length > this._options.splitThreshold) {
        const splitAt: number = Math.floor(this.length / 2);
        this.left = new Rope(this.getLeftOfValue(splitAt), this, this._options);
        this.right = new Rope(this.getRightOfValue(splitAt), this, this._options);
        this.value = "";
      }
    } else {
      if (this.length < this._options.joinThreshold) {
        this.value = (this.left?.toString() || "") + (this.right?.toString() || "");
        this.left = null;
        this.right = null;
      }
    }
  }

  public insert(value: string, position: number = this.length): void {
    if (!value) return;
    if (position < 0 || position > this.length) throw new Error(`Position is out of bounds: ${position}`);

    if (this.value) {
      this.value = this.getLeftOfValue(position) + value + this.getRightOfValue(position);
      this.length = this.value.length;
    } else {
      if (!this.left) {
        this.value = value;
        this.length = this.value.length;
      } else {
        const leftLength = this.left?.length || 0;
        if (position <= leftLength) {
          this.left!.insert(value, position);
        } else {
          this.right!.insert(value, position - leftLength);
        }
        this.length = this.left.length + (this.right?.length || 0);
      }
    }
    this.adjust();
  }

  public remove(start: number, end: number = this.length): string {
    if (start < 0 || start > this.length) throw new Error(`Start is out of bounds: ${start}`);
    if (end < start || end > this.length) throw new Error(`End is out of bounds: ${start}`);

    let removedValue: string = "";

    if (this.value) {
      removedValue = this.value.substring(start + 1, start + (end - start - 1));
      this.value = this.value.substring(0, start) + this.value.substring(end);
    } else {
      const leftLength: number = this.left?.length || 0;
      const leftStart: number = Math.min(start, leftLength);
      const leftEnd: number = Math.min(end, leftLength);

      const rightLength: number = this.right?.length || 0;
      const rightStart: number = Math.max(0, Math.min(start - leftLength, rightLength));
      const rightEnd: number = Math.max(0, Math.min(end - leftLength, rightLength));

      if (leftStart < leftLength) {
        removedValue += this.left?.remove(leftStart, leftEnd);
      }
      if (rightEnd > 0) {
        removedValue += this.right?.remove(rightStart, rightEnd);
      }
    }
    this.length = this.value.length + (this.left?.length || 0) + (this.right?.length || 0);

    this.adjust();
    return removedValue;
  }

  public rebuild(): void {
    this.value = this.toString();
    this.left = null;
    this.right = null;
    this.adjust();
  }

  public rebalance(): void {
    const leftLength: number = this.left?.length || 0;
    const rightLength: number = this.right?.length || 0;

    if (!leftLength && !rightLength) return;

    const leftRightRatio: number = !rightLength ? 0 : leftLength / rightLength;
    const rigthLeftRatio: number = !leftLength ? 0 : rightLength / leftLength;

    if (leftRightRatio > this._options.rebalanceThreshold || rigthLeftRatio > this._options.rebalanceThreshold) {
      this.rebuild();
    } else {
      this.left?.rebalance();
      this.right?.rebalance();
    }
  }

  public getRange(start: number, end: number = this.length): string {
    if (start < 0) start = this.length - start;
    if (end < 0) end = 0 - end;
    if (this.value) return this.value.substring(start, end);

    const leftLength: number = this.left?.length || 0;
    const leftStart: number = Math.min(start, leftLength);
    const leftEnd: number = Math.min(end, leftLength);

    const rightLength: number = this.right?.length || 0;
    const rightStart: number = Math.max(0, Math.min(start - leftLength, rightLength));
    const rightEnd: number = Math.max(0, Math.min(end - leftLength, rightLength));

    if (leftStart !== leftEnd) {
      if (rightStart !== rightEnd) {
        return (this.left?.getRange(leftStart, leftEnd) || "") + (this.right?.getRange(rightStart, rightEnd) || "");
      } else {
        return this.left?.getRange(leftStart, leftEnd) || "";
      }
    } else {
      if (rightStart !== rightEnd) {
        return this.right?.getRange(rightStart, rightEnd) || "";
      }
    }

    return "";
  }

  public chartAt(position: number): string {
    return this.getRange(position, position + 1);
  }

  public charCodeAt(position: number): number {
    return this.chartAt(position)?.charCodeAt(0);
  }

  public toString(): string {
    if (this.value) return this.value;
    return (this.left?.toString() || "") + (this.right?.toString() || "");
  }

  public toJson(): string {
    return JSON.stringify(this.getJsonRepresentation(), null, 2);
  }

  public getJsonRepresentation(): {} {
    return {
      value: this.value,
      length: this.length,
      left: this.left?.getJsonRepresentation() || null,
      right: this.right?.getJsonRepresentation() || null,
    };
  }

  private getLeftOfValue(splitAt: number): string {
    return this.value.substring(0, splitAt);
  }

  private getRightOfValue(splitAt: number): string {
    return this.value.substring(splitAt);
  }
}
