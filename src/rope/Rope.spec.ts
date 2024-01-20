import { describe, beforeEach, it, expect } from "vitest";
import { Rope, RopeOptions } from "./Rope";

describe("Rope", () => {
  let rope: Rope;
  let options: RopeOptions;

  beforeEach(() => {
    options = {
      splitThreshold: 10,
      joinThreshold: 5,
      rebalanceThreshold: 1.2,
    };
    rope = new Rope("This is a string of several character. 54 to be exact!", null, options);
  });

  it("should output entire string", () => {
    expect(rope.toString()).toEqual("This is a string of several character. 54 to be exact!");
  });

  it("should have a length of 54", () => {
    expect(rope.length).toEqual(54);
  });

  it("should insert text at the end", () => {
    const textToInsert = " Here is a bit more text.";
    const currentValue = rope.toString();

    rope.insert(" Here is a bit more text.");
    expect(rope.toString()).toEqual(currentValue + textToInsert);
  });

  it("should insert text at position 20", () => {
    rope.insert("[Inserted Text]", 20);
    expect(rope.toString()).toEqual("This is a string of [Inserted Text]several character. 54 to be exact!");
  });

  it("should remove text from position 20 to 35", () => {
    rope = new Rope("This is a string of [Inserted Text]several character. 54 to be exact!", null, options);
    rope.remove(20, 35);
    expect(rope.toString()).toEqual("This is a string of several character. 54 to be exact!");
  });

  it("should return chartAt 39", () => {
    expect(rope.chartAt(39)).toEqual("5");
  });
});
