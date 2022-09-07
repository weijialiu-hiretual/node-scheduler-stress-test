const express = require('express')
const app = express()
const bodyParser = require('body-parser');

const port = 3000

app.use(bodyParser.json({ limit: '2mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/callback', async (req, res) =>{
  try {
    const reqBody = req.body;
    console.log(reqBody);
  } catch (e) {
    console.log(e);
  }
  res.status(200).json({message: "success"});
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
