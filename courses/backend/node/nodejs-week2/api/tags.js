import express from "express";
import knexInstance from "../database.js";
import { createTagSchema, updateTagSchema } from "../validation.js";

const router = express.Router();

router.get("/", async (request, response) => {
  try {
    const tags = await knexInstance("tags").select("id", "name");
    response.json(tags);
  } catch (error) {
    console.error("Database error:", error);
    response.status(500).json({
      error: "Internal server error",
    });
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
    console.error("Database error:", error);
    response.status(500).json({
      error: "Internal server error",
    });
  }
});

router.post("/", async (request, response) => {
  try {
    const body = request.body;
    const validation = createTagSchema.safeParse(body);

    if (!validation.success) {
      return response.status(400).json({ error: validation.error.errors });
    }

    const data = validation.data;
    const name = data.name;

    const result = await knexInstance("tags").insert({
      name: name,
    });

    const newId = result[0];

    response.status(201).json({
      message: "Tag created successfully",
      id: newId,
    });
  } catch (error) {
    console.error("Database error:", error);
    response.status(500).json({
      error: "Internal server error",
    });
  }
});

router.put("/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const body = request.body;

    const validation = updateTagSchema.safeParse(body);
    if (!validation.success) {
      return response.status(400).json({ error: validation.error.errors });
    }

    const data = validation.data;
    const name = data.name;

    const tag = await knexInstance("tags").where("id", id).first();
    if (!tag) {
      return response.status(404).json({ error: "Tag not found" });
    }

    await knexInstance("tags").where("id", id).update({
      name: name,
    });

    response.status(200).json({
      message: "Tag updated successfully",
      id: id,
    });
  } catch (error) {
    console.error("Database error:", error);
    response.status(500).json({
      error: "Internal server error",
    });
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
    console.error("Database error:", error);
    response.status(500).json({
      error: "Internal server error",
    });
  }
});

export default router;
