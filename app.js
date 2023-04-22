const googleTrends = require("google-trends-api");
const express = require("express");
const fs = require("fs");

const app = express();

app.get("/", async (req, res) => {
  //   res.send("LOL");
  res.send(await getTrend("Lalka"));
});

app.listen(3000, () =>
  console.log("Example app listening on port http://localhost:3000")
);

function getTrend(keyword) {
  return googleTrends
    .interestOverTime({ keyword: keyword })
    .then(function (results) {
      fs.writeFile("test1.json", results, function (err) {
        if (err) {
          return console.log(err);
        }
        console.log("The file was saved!");
      });
    });
}
