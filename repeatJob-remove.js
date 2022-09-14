const fetch = require('node-fetch');

const node_scheduler_url = 'http://nodescheduler.api.testhtm';

// const node_scheduler_url = 'http://localhost:5555';

async function remove() {
  for (let i = 0; i < 1; i++) {
    const result = await fetch(node_scheduler_url + '/api/removeRepeatable', {
      method: 'POST',
      headers: {
        'User-Agent': '',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        queue: "stress-test-batch",
        options: {
          jobId: `repeat-stress-test-${i}`,
          cron: "0 0/2 * * * ?",
        }
      }),
    });
    console.log(await result.json());
  }
}

remove().then(() => {
  console.log("Done!");
})
