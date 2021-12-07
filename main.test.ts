import { getIncompleteItemsByUser, validateData } from "./main";

type TestCase = {
  description: string;
  testItem: any;
  expectError: boolean;
};

const testCases: TestCase[] = [
  {
    description: "Valid all fields",
    testItem: {
      userId: 1,
      completed: false,
      title: "this is a title",
      id: 8,
    },
    expectError: false,
  },
  {
    description: "Valid missing title",
    testItem: {
      userId: 1,
      completed: false,
      id: 8,
    },
    expectError: false,
  },
  {
    description: "Invalid userId",
    testItem: {
      completed: false,
      id: 8,
      title: "this is a title, again",
    },
    expectError: true,
  },
];

testCases.forEach((t) => {
  test(t.description, () => {
    if (t.expectError) {
      expect(() => validateData(t.testItem)).toThrowError();
    } else {
      expect(validateData(t.testItem)).toBe(true);
    }
  });
});

const user2ItemComplete = {
  userId: 2,
  completed: true,
  id: 12,
  title: "title",
};
const user2ItemIncomplete = {
  userId: 2,
  completed: false,
  id: 14,
  title: "another title",
};
const user9ItemComplete = {
  userId: 9,
  completed: false,
  id: 14,
  title: "title",
};
const user10ItemComplete = {
  userId: 10,
  completed: true,
  id: 6,
  title: "this is a title",
};

const testCasesIncompleteItems = [
  user10ItemComplete,
  user2ItemComplete,
  user2ItemIncomplete,
  user9ItemComplete,
];

test("Test getIncompleteItemsByUser", () => {
  expect(getIncompleteItemsByUser(testCasesIncompleteItems)).toMatchObject({
    "2": 1,
    "9": 1,
  });
  expect(getIncompleteItemsByUser([user2ItemComplete])).toMatchObject({});
  expect(
    getIncompleteItemsByUser([user2ItemComplete, user2ItemIncomplete])
  ).toMatchObject({ "2": 1 });
  expect(
    getIncompleteItemsByUser([user2ItemIncomplete, user2ItemIncomplete])
  ).toMatchObject({ "2": 2 });
});
