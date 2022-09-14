const fetch = require('node-fetch');

const node_scheduler_url = 'http://nodescheduler.api.testhtm';

// const node_scheduler_url = 'http://localhost:5555';

async function main() {
  for (let i = 0; i < 1; i++) {
    const result = await fetch(node_scheduler_url + '/api/schedule', {
      method: 'POST',
      headers: {
        'User-Agent': '',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        queue: "stress-test-batch",
        url: "http://emailserver.api.testhtm/callback/test",
        args: {},
        headers: {},
        options: {
          repeat: {
            cron: "0 0/2 * * * ?"
          },
          jobId: `repeat-stress-test-${i}`
        },
        additionalOptions: {}
      })
    });
    console.log(await result.json());
  }
}

main().then(() => {
  console.log("Done!");
})
