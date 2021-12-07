const axios = require("axios");

export type ExpectedData = {
  userId: number;
  completed: boolean;
  title?: string;
  id: number;
};

type IncompleteItemsByUser = {
  // userIdString = item.userId.toString()
  [userIdString: string]: number;
};

type Result = {
  totalItems: number;
  incompleteByUser: IncompleteItemsByUser;
};

const getData = async () => {
  const { data } = await axios.get(
    "https://jsonplaceholder.typicode.com/todos"
  );
  return data;
};

const getTotalNumberOfItems = (data: ExpectedData[]) => {
  return data.length;
};

export const getIncompleteItemsByUser = (list: ExpectedData[]) => {
  let incompleteItemsByUser = {} as IncompleteItemsByUser;

  list.forEach((item) => {
    if (!validateData(item)) return;
    if (item.completed) return;

    let currentUser = item.userId.toString();

    if (incompleteItemsByUser[currentUser]) {
      incompleteItemsByUser[currentUser]++;
      return;
    }

    incompleteItemsByUser[currentUser] = 1;
  });

  return incompleteItemsByUser;
};

export const validateData = (item: ExpectedData) => {
  if (!item || !item.userId) {
    throw new Error("There was an error validating data.");
  }
  return true;
};

(async () => {
  try {
    await getData().then((list) => {
      const total = getTotalNumberOfItems(list);
      const incomplete = getIncompleteItemsByUser(list);

      return {
        totalItems: total,
        incompleteItemsByUser: incomplete,
      };
    });
  } catch {
    console.log("There was an error.");
  }
})();
