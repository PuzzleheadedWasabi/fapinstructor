import actionIterator from "./actionIterator";

const generator = () => () => {
  return "action";
};
test("iterate one action", () => {
  const iterator = actionIterator(generator);

  const result = iterator.next();

  expect(result.value()).toBe("action");
});

test("iterate two actions", () => {
  const iterator = actionIterator(generator);

  const result = iterator.next();
  expect(result.value()).toBe("action");

  const result2 = iterator.next();
  expect(result2.value()).toBe("action");
});

test("iterate action array", () => {
  const iterator = actionIterator([
    () => {
      return "action";
    },
    () => {
      return "action2";
    }
  ]);

  const result = iterator.next();
  expect(result.value()).toBe("action");

  const result2 = iterator.next();
  expect(result2.value()).toBe("action2");
});
