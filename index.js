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

(async () => {
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
})();
