let { sum, subs, mult, mod } = require("./index");

test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});

test("subs 3 - 1 to equal 2", () => {
  expect(subs(3, 1)).toBe(2);
});

test("mult 5 * 4 to equal 20", () => {
  expect(mult(5, 4)).toBe(20);
});

test("mod 20 % 4 to equal 0", () => {
  expect(mod(20, 4)).toBe(0);
});

test("mod 21 % 4 to equal 1", () => {
  expect(mod(21, 4)).toBe(1);
});
