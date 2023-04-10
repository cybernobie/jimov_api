"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
/* import axios from "axios";
import { load } from "cheerio"; */
var router = (0, express_1.Router)();
/* async function getDataProvider() {
  const urls = [
    "https://www2.animeflv.bz",
    "https://www.animelatinohd.com/",
    "https://monoschinos2.com/",
    "https://tioanime.com/",
    "https://www3.gogoanimes.fi/",
    "https://zoro.to/home",
    "https://9anime.to/home",
  ];
  const results = [];
  for (let i = 0; i < urls.length; i++) {
    const {data} = await axios.get(urls[i]);
    const $ = load(data);
    const title = $("meta[property=og:site_name]").attr("content") || ""
    const favicon = $('link[rel="icon"]').attr('href') || $('link[rel="shortcut icon"]').attr('href') || '';
    const description = $('meta[name="description"]').attr('content') || '';
    results.push({title, favicon, description});
  }
  return results;
} */
var providers = [
    {
        name: "AnimeFlv",
        description: "The best online anime portal for Latin America, find classic anime, anime of the moment, most popular anime and much more, all in animeflv, your daily anime source.",
        language: "Spanish",
        url: "https://www2.animeflv.bz",
        status: 200,
        icon: "https://animeflv.vc/static/img/icon/logo.png",
        fav_icon: "https://animeflv.vc/favicon.png"
    },
    {
        name: "AnimeLatinoHD",
        description: "Anime Online Free, watch the latest anime episodes of the moment without any restriction subtitled in Spanish Latino in AnimeLHD.",
        language: "Spanish",
        url: "https://www.animelatinohd.com/",
        status: 200,
        icon: "NA",
        fav_icon: "https://www.animelatinohd.com/favicon.ico"
    },
    {
        name: "MonosChinos",
        description: "Monoschinos - Your website to watch and download anime with Spanish subtitles for free online - Watch anime in HD 1080p & HD 720p quality.",
        language: "Spanish",
        url: "https://monoschinos2.com/",
        status: 200,
        icon: "https://monoschinos2.com/public/img/logo6.png",
        fav_icon: "https://monoschinos2.com/public/favicon.ico"
    },
    {
        name: "OtakusTv",
        description: "Anime, share your favorite anime lists, find the best reviews of your favorite anime episodes, Tops, news, separate your anime by watched, watched, finished, abandoned and more.",
        language: "Spanish",
        url: "https://www1.otakustv.com/",
        status: 200,
        icon: "https://www1.otakustv.com/images/logo.png?v=1",
        fav_icon: "https://www1.otakustv.com/favicon.png"
    },
    {
        name: "TioAnime",
        description: "The best portal to watch anime online sub spanish in HD quality, download light anime in HD from Mega, Mediafire and more! TioAnime your best option.",
        language: "Spanish",
        url: "https://tioanime.com/",
        status: 200,
        icon: "https://tioanime.com/assets/img/logo-dark.png",
        fav_icon: "https://tioanime.com/assets/img/icon-32x32.png"
    },
    {
        name: "GogoAnime",
        description: "Gogoanime, Watch anime online in English. You can watch free series and movies online and English subtitle on gogoanime",
        language: "English",
        url: "https://www3.gogoanimes.fi/",
        status: 200,
        icon: "https://gogoanime.llc/img/icon/logo.png",
        fav_icon: "https://cdn.gogocdn.net/files/gogo/img/favicon.ico",
    },
    {
        name: "Zoro",
        description: "Zoro is a Free anime streaming website which you can watch English Subbed and Dubbed Anime online with No Account and Daily update.",
        language: "English",
        url: "https://zoro.to/home",
        status: 200,
        icon: "https://zoro.to/images/logo.png",
        fav_icon: ["https://zoro.to/favicon-32x32.png", "https://zoro.to/images/favicon.png?v=0.1"]
    },
    {
        name: "9Anime",
        description: "Real 9anime with the world largest anime database and fast streaming servers.",
        language: "English",
        url: "https://9anime.to/home",
        status: 200,
        icon: "https://9animeapp.pro/wp-content/uploads/2023/02/cropped-9anime-logo-for-app-1.png",
        fav_icon: "https://9anime.to/assets/sites/9anime/icons/favicon.png"
    },
];
router.get("/providers", function (_req, res) {
    res.status(200).json({ data: providers });
});
exports.default = router;
//# sourceMappingURL=providers.js.map