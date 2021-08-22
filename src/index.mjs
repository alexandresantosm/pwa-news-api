import express from "express";
import cors from "cors";

import economy from "./economy.json";
import technology from "./technology.json";
import world from "./world.json";

const GROUP_NEWS = {
  economy,
  technology,
  world,
};

const app = express();
const PORT = process.env.PORT || 3333;
app.use(cors());

app.get("/api", function (req, res) {
  res.json({
    economy,
    technology,
    world,
  });
});

app.get("/api/:subject", function (req, res) {
  const { subject } = req.params;

  res.json(GROUP_NEWS[subject]);
});

app.get("/api/:subject/:id", function (req, res) {
  const { subject, id } = req.params;
  const allNewsBySubject = GROUP_NEWS[subject];
  const newsById = allNewsBySubject.value.find((news) => news.id === id);

  res.json(newsById);
});

app.listen(PORT, function () {
  console.log(`Server is running on ${PORT} PORT`);
});
