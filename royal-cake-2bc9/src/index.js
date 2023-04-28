import googleTrends from "google-trends-api";
import { Webhook, MessageBuilder } from "discord-webhook-node";
// import { sendRequest } from "./web.js";
const hookUrl =
  "https://discord.com/api/webhooks/1099438330027970570/bGlucgJjz8av7f58y8yAbmb0eC2U2tGqOJTb-YH5_BWT7o-_CAE3eZu01KEU135SCuTC";

const hook = new Webhook(hookUrl);

const books = [
  "Antygona",
  "Odprawa posłów greckich",
  "Makbet",
  "Skąpiec",
  "Konrad Wallenrod",
  "Dziady",
  "Kordian",
  "Lalka",
  "Gloria victis",
  "Potop",
  "Zbrodnia i kara",
  "Wesele",
  "Przedwiośnie",
  "Dżuma",
  "1984",
  "Sofokles",
  "Molier",
  "Żeromski",
  "Borowski",
  "Orwell",
  "Skarga",
  "Anonim",
  "Homer",
  "Biblia",
  "Parandowski",
  "Kochanowski",
  "Szekspir",
  "Mickiewicz",
  "Słowacki",
  "Prus",
  "Orzeszkowa",
  "Wyspiański",
  "Reymont",
  "Sienkiewicz",
  "Pan Tadeusz",
  "Ferdydurke",
  "Gombrowicz",
  "motyw",
  "konflikt",
  "problematyka",
  "bohater literacki",
  "bohater",
];

//discord webhook
// hook.setUsername("Łe");

// sendRequest();

function scanElement(arr, tekst) {
  for (let i = 0; i < arr.length; i++) {
    if (tekst.toLowerCase().includes(arr[i].toLowerCase())) {
      return true;
    }
  }
  return false;
}

async function getTrend() {
  let subjects = [];
  let ids = [];
  const ress = await googleTrends.realTimeTrends({
    geo: "PL",
    hl: "polish",
  });
  let result = JSON.parse(ress);
  result = result.storySummaries;

  for (let i of result.trendingStories) {
    //title
    if (scanElement(books, i.title)) {
      if (!scanElement(ids, i.id)) {
        subjects.push({ from: "title", title: i.title, link: i.shareUrl });
        ids.push(i.id);
      } else {
        break;
      }
    }
    //entityNames
    for (let j of i.entityNames) {
      if (scanElement(books, j)) {
        if (!scanElement(ids, i.id)) {
          subjects.push({
            from: "entityNames",
            title: i.title,
            link: i.shareUrl,
          });
          ids.push(i.id);
        } else {
          break;
        }
      }
    }
    //articles
    for (let j of i.articles) {
      if (scanElement(books, j.articleTitle) || scanElement(books, j.snippet)) {
        if (!scanElement(ids, i.id)) {
          subjects.push({
            from: "articles",
            title: i.title,
            link: i.shareUrl,
            article: j.url,
          });
          ids.push(i.id);
        } else {
          break;
        }
      }
    }
  }

  return subjects;
  // result.storySummaries.trendingStories[0].title
  // result.storySummaries.trendingStories[0].entityNames[0]
  // result.storySummaries.trendingStories[0].articles[0].articleTitle
  // result.storySummaries.trendingStories[0].articles[0].snippet

  // return ress;
}

async function main() {
  // console.log("in fun");
  const data = await getTrend();
  if (data != "") {
    for (let i of data) {
      if (i.from === "articles") {
        let embed = new MessageBuilder()
          .setTitle(i.title)
          .addField("Link: ", i.link, true)
          .addField("From: ", i.from)
          .addField("From article: ", i.article)
          .setColor("#00ff00")
          .setFooter(
            "https://maciekk.me",
            "https://cdn.discordapp.com/embed/avatars/0.png"
          )
          .setTimestamp();
        console.log(JSON.stringify(embed));
        hook.send(embed);
      } else {
        let embed = new MessageBuilder()
          .setTitle(i.title)
          .addField("Link: ", i.link, true)
          .addField("From: ", i.from)
          .setColor("#00ff00")
          .setFooter(
            "https://maciekk.me",
            "https://cdn.discordapp.com/embed/avatars/0.png"
          )
          .setTimestamp();
        hook.send(embed);
      }
    }
  } else {
    let embed = new MessageBuilder()
      .setTitle("No wyciek")
      .addField("Autor: ", "https://maciekk.me")
      .addField("Śledzona słowa: ", "https://maciekk.me/maturawyciek.html")
      .addField("INFO: ", "Nie znaleziono żadych wycieków")
      .setColor("#ff0000")
      .setFooter(
        "https://maciekk.me",
        "https://cdn.discordapp.com/embed/avatars/0.png"
      )
      .setTimestamp();
    hook.send(embed);
  }
}

main();

// setInterval(main, 10000); // 10 minut = 10 * 60 * 1000 milisekund
