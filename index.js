require("dotenv").config();

const args = process.argv.slice(2);
const FROM_ID = args[0];
const TO_ID = args[1];
const AMOUNT = Number.parseFloat(args[2]);

const envKeys = ["USER_TOKEN", "APP_TOKEN"];
let envKeyMissing = false;
envKeys.forEach((envKey) => {
  if (!process.env[envKey]) {
    console.log(`ERROR: missing .env key ${envKey}`);
    envKeyMissing = true;
  }
});
if (envKeyMissing) {
  return;
}

const fetchData = async (url, config) => {
  const response = await fetch(url, config);
  return await response.json();
};

// const mapTransaction = (transaction, splitwiseGroupsObject) => {
//   const net_balance = transaction.users.find(
//     (u) => "" + u.user_id === process.env.SPLITWISE_USER_ID
//   ).net_balance;

//   let payee;
//   if (transaction.description === "Payment") {
//     // Payment to/from FirstName LastName
//     const otherUser = transaction.users.find(
//       (u) => "" + u.user_id !== process.env.SPLITWISE_USER_ID
//     );
//     payee = `Payment ${net_balance > 0 ? "to" : "from"} ${
//       otherUser.user.first_name || ""
//     } ${otherUser.user.last_name || ""}`;
//   } else {
//     // Description [Group Name]
//     payee = `${transaction.description} \[${
//       splitwiseGroupsObject[transaction.group_id]
//     }\]`;
//   }

//   const is_transfer = transaction.payment || net_balance > 0;

//   // Map splitwise transaction to pocketsmith transaction
//   const pocketsmithTransaction = {
//     payee,
//     amount: net_balance,
//     date: transaction.date.split("T")[0],
//     note: "" + transaction.id,
//     is_transfer,
//     category_id: is_transfer
//       ? process.env.POCKETSMITH_TRANSFER_CATEGORY_ID
//       : undefined,
//   };
//   return pocketsmithTransaction;
// };

(async () => {
  // const data = await fetchData("https://api.akahu.io/v1/accounts", {
  //   method: "GET",
  //   headers: {
  //     Authorization: `Bearer ${process.env.USER_TOKEN}`,
  //     "X-Akahu-ID": process.env.APP_TOKEN,
  //   },
  // });
  // console.log(data);
  // console.log(data.items.map((item) => item.attributes));

  // console.log({
  //   from: FROM_ID,
  //   to: TO_ID,
  //   amount: AMOUNT,
  // });

  const response = await fetchData("https://api.akahu.io/v1/transfers", {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      Authorization: `Bearer ${process.env.USER_TOKEN}`,
      "X-Akahu-ID": process.env.APP_TOKEN,
    },
    body: JSON.stringify({
      from: FROM_ID,
      to: TO_ID,
      amount: AMOUNT,
    }),
  });
  console.log(response);

  // // Get all splitwise transactions
  // const splitwiseData = await fetchData(
  //   "https://secure.splitwise.com/api/v3.0/get_expenses",
  //   // "https://secure.splitwise.com/api/v3.0/get_expenses?updated_after=2023-05-15&limit=0",
  //   {
  //     method: "GET",
  //     headers: {
  //       Authorization: `Bearer ${process.env.SPLITWISE_BEARER_TOKEN}`,
  //     },
  //   }
  // );
  // // Filter to just transactions I am involved in
  // const myTransactions = splitwiseData.expenses.filter(
  //   (expense) =>
  //     !!expense.users.find(
  //       (user) => "" + user.user_id === process.env.SPLITWISE_USER_ID
  //     ) && expense.deleted_at === null
  // );

  // // Get all splitwise groups
  // const splitwiseGroupsArray = await fetchData(
  //   "https://secure.splitwise.com/api/v3.0/get_groups",
  //   {
  //     method: "GET",
  //     headers: {
  //       Authorization: `Bearer ${process.env.SPLITWISE_BEARER_TOKEN}`,
  //     },
  //   }
  // );
  // // Create map between group id and name
  // const splitwiseGroupsObject = {};
  // splitwiseGroupsArray.groups.forEach((group) => {
  //   splitwiseGroupsObject[group.id] = group.name;
  // });

  // myTransactions.forEach(async (transaction, index) => {
  //   // Check if pocketsmith has an existing transaction for the splitwise transaction
  //   const existingTransaction = await fetchData(
  //     `https://api.pocketsmith.com/v2/transaction_accounts/${process.env.POCKETSMITH_TRANSACTION_ACCOUNT_ID}/transactions?search=${transaction.id}`,
  //     {
  //       method: "GET",
  //       headers: {
  //         "X-Developer-Key": process.env.POCKETSMITH_DEVELOPER_KEY,
  //       },
  //     }
  //   );
  //   if (!existingTransaction.length) {
  //     const pocketsmithTransaction = mapTransaction(
  //       transaction,
  //       splitwiseGroupsObject
  //     );

  //     // Create pocketsmith transaction
  //     const pocketsmithResponse = await fetchData(
  //       `https://api.pocketsmith.com/v2/transaction_accounts/${process.env.POCKETSMITH_TRANSACTION_ACCOUNT_ID}/transactions`,
  //       {
  //         method: "POST",
  //         headers: {
  //           accept: "application/json",
  //           "content-type": "application/json",
  //           "X-Developer-Key": process.env.POCKETSMITH_DEVELOPER_KEY,
  //         },
  //         body: JSON.stringify(pocketsmithTransaction),
  //       }
  //     );
  //     console.log(`${index} made`);
  //   } else console.log(`${index} exists`);
  //   // Pocketsmith transaction already exists, do nothing
  // });
})();
