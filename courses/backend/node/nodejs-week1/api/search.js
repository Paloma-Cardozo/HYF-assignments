import express from "express";
import knexInstance from "../database.js";

const router = express.Router();

router.get("/", async (request, response) => {
  try {
    const q = request.query.q;

    if (!q) {
      const snippets = await knexInstance("snippets").select(
        "id",
        "title",
        "contents",
      );
      return response.json(snippets);
    }

    const snippets = await knexInstance("snippets")
      .select("id", "title", "contents")
      .where("title", "like", `%${q}%`)
      .orWhere("contents", "like", `%${q}%`);

    response.json(snippets);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (request, response) => {
  try {
    const id = request.params.id;

    const snippet = await knexInstance("snippets")
      .select("id", "title", "contents")
      .where("id", id)
      .first();

    if (!snippet) {
      return response.status(404).json({ error: "Snippet not found" });
    }

    response.json(snippet);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

router.post("/", async (request, response) => {
  try {
    const q = request.query.q;
    const body = request.body || {};
    const fields = body.fields;

    if (q && fields) {
      return response.status(400).json({
        error: "Cannot use both q parameter and fields in body",
      });
    }

    if (fields) {
      let query = knexInstance("snippets");

      if (fields.tags) {
        query = query
          .select("snippets.id", "snippets.title", "snippets.contents")
          .join("snippet_tag", "snippets.id", "snippet_tag.snippet_id")
          .join("tags", "snippet_tag.tag_id", "tags.id")
          .where("tags.name", "like", `%${fields.tags}%`);
      }

      const snippets = await query;

      const formattedSnippets = snippets.map((snippet) => ({
        id: snippet.id,
        title: snippet.title,
        contents: snippet.contents,
        tags: [fields.tags],
      }));

      return response.json(formattedSnippets);
    }

    if (q) {
      const snippets = await knexInstance("snippets")
        .select("id", "title", "contents")
        .where("title", "like", `%${q}%`)
        .orWhere("contents", "like", `%${q}%`);

      return response.json(snippets);
    }

    const snippets = await knexInstance("snippets").select(
      "id",
      "title",
      "contents",
    );

    response.json(snippets);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

export default router;
