const fetch = require("node-fetch");

let rightCount = 0;
let wrongCount = 0;
let totalCount = 100000;
let concurrency = 50;
let loopCount = totalCount / concurrency;

async function doTest(threadId) {

  for (let i = 0; i < loopCount; i++) {

    try {
      const result = await fetch('http://nodescheduler.api.testhtm/api/schedule', {
        method: 'POST',
        headers: {
          'User-Agent': '',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          queue: "stress-test",
          url: "http://emailserver.api.testhtm/callback/test",
          args: {},
          headers: {},
          options: {},
          additionalOptions: {}
        })
      });
      if (result.ok) {
        rightCount++;
        console.log(`[✔️]${result.status} WrongRate=${(wrongCount / (wrongCount + rightCount) * 100).toFixed(2)}% thread-${threadId}, task-${i}`);
      } else {
        wrongCount++;
        console.log(`[❌]${result.status} WrongRate=${(wrongCount / (wrongCount + rightCount) * 100).toFixed(2)}% thread-${threadId}, task-${i}`);
      }
    } catch (e) {
      wrongCount++;
      console.log(`[❌] WrongRate=${(wrongCount / (wrongCount + rightCount) * 100).toFixed(2)}% thread-${threadId}, task-${i}`);
    }
  }
}


async function main() {
  const promises = [];
  for (let i = 0; i < concurrency; i++) {
    promises.push(doTest(i));
  }
  await Promise.all(promises);
}

main().then(() => {
  console.log(`Done! wrongCount=${wrongCount}, rightCount=${rightCount}, WrongRate=${(wrongCount / (wrongCount + rightCount) * 100).toFixed(2)}%`);
});
