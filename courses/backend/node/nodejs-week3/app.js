import express from "express";
import snippetsRouter from "./api/snippets.js";
import tagsRouter from "./api/tags.js";
import searchRouter from "./api/search.js";
import authRouter from "./api/auth.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/snippets", snippetsRouter);
app.use("/api/tags", tagsRouter);
app.use("/search", searchRouter);
app.use(authRouter);

app.get("/", (request, response) => {
  response.send("This is a search engine");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
