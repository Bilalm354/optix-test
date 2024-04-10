import { getMeanAverage } from "./getMeanAverage";

describe("getMeanAverage", () => {
  it("should return the mean average of a list of numbers", () => {
    expect(getMeanAverage([1, 2, 3, 4, 5])).toBe(3);
  });
});
