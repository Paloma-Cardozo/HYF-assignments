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
    const tags = await knexInstance("tags").select("id", "name");
    response.json(tags);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (request, response) => {
  try {
    const id = request.params.id;

    const tag = await knexInstance("tags").where("id", id).first();

    if (!tag) {
      return response.status(404).json({ error: "Tag not found" });
    }

    response.json(tag);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

router.post("/", async (request, response) => {
  try {
    const body = request.body;

    const validation = validateRequiredFields(body, ["name"]);

    if (!validation.valid) {
      return response.status(400).json({ error: validation.error });
    }

    const name = body.name;

    const result = await knexInstance("tags").insert({
      name: name,
    });

    const newId = result[0];

    response.status(201).json({
      message: "Tag created successfully",
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

    const validation = validateRequiredFields(body, ["name"]);
    if (!validation.valid) {
      return response.status(400).json({ error: validation.error });
    }

    const tag = await knexInstance("tags").where("id", id).first();
    if (!tag) {
      return response.status(404).json({ error: "Tag not found" });
    }

    const name = body.name;

    await knexInstance("tags").where("id", id).update({
      name: name,
    });

    response.status(200).json({
      message: "Tag updated successfully",
      id: id,
    });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

router.delete("/:id", async (request, response) => {
  try {
    const id = request.params.id;

    const tag = await knexInstance("tags").where("id", id).first();
    if (!tag) {
      return response.status(404).json({ error: "Tag not found" });
    }

    await knexInstance("tags").where("id", id).delete();

    response.status(200).json({
      message: "Tag deleted successfully",
      id: id,
    });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

export default router;
