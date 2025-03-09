import cors from "cors";
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

import { createShortUrl, getUrl } from "./db";

const app: Express = express();
app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("OK");
});

app.get("/:short_url", async (req: Request, res: Response) => {
  const short_url = req.params.short_url;
  const url = await getUrl(short_url);
  console.log(url);
  res.redirect(url.data);
});

app.post("/", async (req: Request, res: Response) => {
  let url = req.body.url;
  const short_url = await createShortUrl(url);
  res.status(200).send({
    url: short_url,
  });
});

const PORT = process.env.PORT ?? 8080;

app.listen(PORT, () => {
  console.log("Listening at", PORT);
});
