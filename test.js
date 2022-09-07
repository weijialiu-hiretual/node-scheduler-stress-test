const fetch = require("node-fetch");

let rightCount = 0;
let wrongCount = 0;

async function doTest(threadId) {

  for (let i = 0; i < 100; i++) {

    try {
      const result = await fetch('http://nodescheduler.api.testhtm/api/schedule', {
        method: 'POST',
        headers: {
          'User-Agent': '',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          queue: "stress-test",
          url: "http://10.100.7.107:3000/callback",
          args: {
            thread: `thread-${threadId}`, task: `task-${i}`
          },
          headers: {},
          options: {},
          additionalOptions: {}
        })
      });
      rightCount++;
      console.log(`[✔️] WrongRate=${(wrongCount / (wrongCount + rightCount) * 100).toFixed(2)}% thread-${threadId}, task-${i}`);
    } catch (e) {
      wrongCount++;
      console.log(`[❌] WrongRate=${(wrongCount / (wrongCount + rightCount) * 100).toFixed(2)}% thread-${threadId}, task-${i}`);
    }
  }
}


async function main() {
  const promises = [];
  for (let i = 0; i < 50; i++) {
    promises.push(doTest(i));
  }
  await Promise.all(promises);
}

main().then(() => {
  console.log(`Done! wrongCount=${wrongCount}, rightCount=${rightCount}, WrongRate=${(wrongCount / (wrongCount + rightCount) * 100).toFixed(2)}%`);
});
