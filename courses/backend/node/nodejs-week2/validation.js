import z from "zod";

export const createSnippetSchema = z.object({
  user_id: z.number().int().positive("user_id must be a positive number"),
  title: z.string().min(3, "title must be at least 3 characters long"),
  contents: z.string().min(3, "contents must be at least 3 characters long"),
  is_private: z.number().int().optional(),
});

export const updateSnippetSchema = z.object({
  user_id: z.number().int().positive("user_id must be a positive number"),
  title: z.string().min(3, "title must be at least 3 characters long"),
  contents: z.string().min(3, "contents must be at least 3 characters long"),
  is_private: z.number().int().optional(),
});

export const createTagSchema = z.object({
  name: z.string().min(3, "name must be at least 3 characters long"),
});

export const updateTagSchema = z.object({
  name: z.string().min(3, "name must be at least 3 characters long"),
});

export const addTagToSnippetSchema = z.object({
  tag_id: z.number().int().positive("tag_id must be a positive number"),
});
