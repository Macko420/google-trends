const googleTrends = require("google-trends-api");
const express = require("express");
const fs = require("fs");
const { Webhook, MessageBuilder } = require("discord-webhook-node");
const { get } = require("http");
const util = require("util");
const { checkPrimeSync } = require("crypto");
const hook = new Webhook(
  "https://discord.com/api/webhooks/1099438330027970570/bGlucgJjz8av7f58y8yAbmb0eC2U2tGqOJTb-YH5_BWT7o-_CAE3eZu01KEU135SCuTC"
);

const app = express();

//discord webhook
const IMAGE_URL = "https://homepages.cae.wisc.edu/~ece533/images/airplane.png";
hook.setUsername("Łe");
hook.setAvatar(IMAGE_URL);

app.get("/", async (req, res) => {
  const data = await getTrend();
  console.log(data, "data");
  // for (i of data) {
  //   let embed = new MessageBuilder()
  //     .setTitle(i.query)
  //     .addField("1", i.title, true)
  //     .addField("2", i.snippet)
  //     .setColor("#00b0f4");
  //   hook.send(embed);
  // }

  res.send(data);
});

app.listen(3000, () =>
  console.log("Example app listening on port http://localhost:3000")
);

function getTrend(keyword) {
  return googleTrends.realTimeTrends({
    geo: "PL",
  });
  // .then(function (results) {
  //   console.log(typeof results);
  //   // let chuj = fs.writeFile("test1.json", results, function (err) {
  //   //   if (err) {
  //   //     return console.log(err);
  //   //   }
  //   //   console.log("The file was saved!");
  //   // });

  //   // results = JSON.parse(results);
  //   // let query = "";
  //   // let title = "";
  //   // let snippet = "";
  //   // let arr = [];
  //   // let element = {};

  //   // for (i of results.default.trendingSearchesDays[0].trendingSearches) {
  //   //   query = i.title.query;
  //   //   for (j of i.articles) {
  //   //     title = j.title;
  //   //     snippet = j.snippet;
  //   //     element = { query: query, title: title, snippet: snippet };
  //   //     arr.push(element);
  //   //   }
  //   // }

  //   // console.log(arr, "arr");

  //   return results;
  // });
}
