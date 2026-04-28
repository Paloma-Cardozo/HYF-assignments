import express from "express";
import snippetsRouter from "./api/snippets.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/snippets", snippetsRouter);

app.get("/", (request, response) => {
  response.send("This is a search engine");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
