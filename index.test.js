let { sum, subs, mult } = require('./index');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});


test('subs 3 - 1 to equal 2', () => {
  expect(subs(3, 1)).toBe(2);
});

test('mult 5 * 4 to equal 20', () => {
  expect(mult(5, 4)).toBe(20);
});
