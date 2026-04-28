import express from "express";
import knexInstance from "../database.js";

const router = express.Router();

function validateRequiredFields(data, requiredFields) {
  const missing = requiredFields.filter((field) => !data[field]);

  if (missing.length > 0) {
    return {
      valid: false,
      error: `Missing required fields: ${missing.join(", ")}`,
    };
  }

  return { valid: true };
}

router.get("/", async (request, response) => {
  try {
    const snippets = await knexInstance("snippets")
      .select(
        "snippets.*",
        "users.id as user_id",
        "users.first_name",
        "users.last_name",
      )
      .where("snippets.is_private", false)
      .join("users", "snippets.user_id", "users.id");

    const formattedSnippets = snippets.map((snippet) => ({
      id: snippet.id,
      created_at: snippet.created_at,
      title: snippet.title,
      contents: snippet.contents,
      is_private: snippet.is_private,
      user: {
        id: snippet.user_id,
        first_name: snippet.first_name,
        last_name: snippet.last_name,
      },
    }));

    response.json(formattedSnippets);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (request, response) => {
  try {
    const id = request.params.id;

    const snippet = await knexInstance("snippets")
      .select(
        "snippets.*",
        "users.id as user_id",
        "users.first_name",
        "users.last_name",
      )
      .where("snippets.id", id)
      .join("users", "snippets.user_id", "users.id")
      .first();

    if (!snippet) {
      return response.status(404).json({ error: "Snippet not found" });
    }

    const formattedSnippet = {
      id: snippet.id,
      created_at: snippet.created_at,
      title: snippet.title,
      contents: snippet.contents,
      is_private: snippet.is_private,
      user: {
        id: snippet.user_id,
        first_name: snippet.first_name,
        last_name: snippet.last_name,
      },
    };

    response.json(formattedSnippet);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

router.post("/", async (request, response) => {
  try {
    const body = request.body;

    const validation = validateRequiredFields(body, [
      "user_id",
      "title",
      "contents",
    ]);

    if (!validation.valid) {
      return response.status(400).json({ error: validation.error });
    }

    const user_id = body.user_id;
    const title = body.title;
    const contents = body.contents;
    const is_private = body.is_private;

    if (is_private === undefined) {
      is_private = 0;
    }

    const result = await knexInstance("snippets").insert({
      user_id: user_id,
      title: title,
      contents: contents,
      is_private: is_private,
    });

    const newId = result[0];

    response.status(201).json({
      message: "Snippet created successfully",
      id: newId,
    });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

router.put("/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const body = request.body;

    const validation = validateRequiredFields(body, [
      "user_id",
      "title",
      "contents",
    ]);

    if (!validation.valid) {
      return response.status(400).json({ error: validation.error });
    }

    const snippet = await knexInstance("snippets").where("id", id).first();

    if (!snippet) {
      return response.status(404).json({ error: "Snippet not found" });
    }

    const user_id = body.user_id;
    const title = body.title;
    const contents = body.contents;
    let is_private = body.is_private;

    if (is_private === undefined) {
      is_private = snippet.is_private;
    }

    await knexInstance("snippets").where("id", id).update({
      user_id: user_id,
      title: title,
      contents: contents,
      is_private: is_private,
    });

    response.status(200).json({
      message: "Snippet updated successfully",
      id: id,
    });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

router.delete("/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const snippet = await knexInstance("snippets").where("id", id).first();

    if (!snippet) {
      return response.status(404).json({ error: "Snippet not found" });
    }

    await knexInstance("snippets").where("id", id).delete();

    response.status(200).json({
      message: "Snippet deleted successfully",
      id: id,
    });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

router.get("/:id/tags", async (request, response) => {
  try {
    const id = request.params.id;
    const snippet = await knexInstance("snippets").where("id", id).first();

    if (!snippet) {
      return response.status(404).json({ error: "Snippet not found" });
    }

    const tags = await knexInstance("snippet_tag")
      .select("tags.id", "tags.name")
      .join("tags", "snippet_tag.tag_id", "tags.id")
      .where("snippet_tag.snippet_id", id);

    response.json(tags);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

router.post("/:id/tags", async (request, response) => {
  try {
    const id = request.params.id;
    const body = request.body;
    const validation = validateRequiredFields(body, ["tag_id"]);

    if (!validation.valid) {
      return response.status(400).json({ error: validation.error });
    }

    const snippet = await knexInstance("snippets").where("id", id).first();

    if (!snippet) {
      return response.status(404).json({ error: "Snippet not found" });
    }

    const tag_id = body.tag_id;
    const tag = await knexInstance("tags").where("id", tag_id).first();

    if (!tag) {
      return response.status(404).json({ error: "Tag not found" });
    }

    await knexInstance("snippet_tag").insert({
      snippet_id: id,
      tag_id: tag_id,
    });

    response.status(201).json({
      message: "Tag added to snippet successfully",
      snippet_id: id,
      tag_id: tag_id,
    });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

router.delete("/:id/tags/:tag_id", async (request, response) => {
  try {
    const id = request.params.id;
    const tag_id = request.params.tag_id;

    const relation = await knexInstance("snippet_tag")
      .where("snippet_id", id)
      .where("tag_id", tag_id)
      .first();

    if (!relation) {
      return response
        .status(404)
        .json({ error: "Tag not associated with this snippet" });
    }

    await knexInstance("snippet_tag")
      .where("snippet_id", id)
      .where("tag_id", tag_id)
      .delete();

    response.status(200).json({
      message: "Tag removed from snippet successfully",
      snippet_id: id,
      tag_id: tag_id,
    });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

export default router;
