import { average } from "../lib/average";
import { describe, expect, test } from "vitest";

describe("check average function", () => {
  test("average value", () => {
    expect(average([1, 1, 1, 1, 1, 1, 1])).toBe("1.00");
    expect(average([])).toBe("--");
  });
});
