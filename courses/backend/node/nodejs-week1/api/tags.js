// PUT actualizar snippet
router.put("/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const body = request.body;

    // Validar que al menos un campo venga para actualizar
    const validation = validateRequiredFields(body, [
      "user_id",
      "title",
      "contents",
    ]);
    if (!validation.valid) {
      return response.status(400).json({ error: validation.error });
    }

    // Verificar que el snippet existe
    const snippet = await knexInstance("snippets").where("id", id).first();
    if (!snippet) {
      return response.status(404).json({ error: "Snippet not found" });
    }

    // Obtener datos
    const user_id = body.user_id;
    const title = body.title;
    const contents = body.contents;
    let is_private = body.is_private;

    // Si is_private no viene, mantener el existente
    if (is_private === undefined) {
      is_private = snippet.is_private;
    }

    // Actualizar en BD
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

// DELETE eliminar snippet
router.delete("/:id", async (request, response) => {
  try {
    const id = request.params.id;

    // Verificar que el snippet existe
    const snippet = await knexInstance("snippets").where("id", id).first();
    if (!snippet) {
      return response.status(404).json({ error: "Snippet not found" });
    }

    // Eliminar de BD
    await knexInstance("snippets").where("id", id).delete();

    response.status(200).json({
      message: "Snippet deleted successfully",
      id: id,
    });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});
