var cors = require('cors')
const express = require('express');
const serverless = require('serverless-http');
const app = express();
const router = express.Router()

const getRandomInt = (max = 100) => {
  return Math.floor(Math.random() * Math.floor(max));
}

const getRandomColor = () => {
  let colorValues = ["red", "blue", "green", "yellow", "rebeccapurple", "auqua", "orange"];
  return colorValues[Math.floor(Math.random() * colorValues.length)];
}

router.get("/", (req, response) => {
  console.log("we home!");
  response.json({
    message: "Enjoy exploring Matt.",
    error: "There are no errors when brogramming in MattLABs"
  });
});

router.get("/matt", (req, response) => {
  response.json({
    matt: {
      height: "8 ft.",
      eyes: "lasers",
      footSize: 14,
      description: "Mary Poppins asexually had a child, and that child is Matt Solle."
    },
    error: ""
  });
});

router.get("/matt/heads/:count?", (req, response) => {
  let numberOfheads;
  numberOfheads = numberOfheads = req.params.count === undefined ? 0 : req.params.count;
 
  if (numberOfheads > 0 ) {
    var heads = [];

    for (let i = 0; i < numberOfheads; i++) {
      heads.push({ bgColor: getRandomColor(), color: getRandomColor(), classes: "bb", id: i.toString() });
    }

    response.json({heads: heads, error: ""});
  } else {
    response.json({
      heads: [],
      message: "There weren't any heads requested...",
      error: "0 heads requested"
    });
  }
});

app.use(cors());
app.use('/.netlify/functions/api', router);

module.exports.handler = serverless(app);