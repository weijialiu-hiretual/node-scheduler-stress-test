const fetch = require('node-fetch');

const node_scheduler_url = 'http://nodescheduler.api.testhtm';

// const node_scheduler_url = 'http://localhost:5555';

async function get() {
  const result = await fetch(node_scheduler_url + '/api/getRepeatableJobs', {
    method: 'POST',
    headers: {
      'User-Agent': '',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      queue: "stress-test-batch",
      needData: true,
    }),
  });
  console.log(await result.json());
}


get().then(() => {
  console.log("Done!");
})
