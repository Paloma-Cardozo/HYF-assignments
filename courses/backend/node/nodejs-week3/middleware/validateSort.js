export const validateSort = (allowedColumns = []) => {
  return (req, res, next) => {
    if (!req.query.sort) {
      return next();
    }

    const sortParam = req.query.sort.toString();
    const parts = sortParam.split(" ");
    const column = parts[0];
    let direction = "ASC";

    if (parts.length > 1) {
      direction = parts[1].toUpperCase();
    }

    if (!allowedColumns.includes(column)) {
      return res.status(400).json({
        error: `Invalid sort column. Allowed: ${allowedColumns.join(", ")}`,
      });
    }

    if (!["ASC", "DESC"].includes(direction.toUpperCase())) {
      return res.status(400).json({
        error: "Sort direction must be ASC or DESC",
      });
    }

    req.sortColumn = column;
    req.sortDirection = direction.toUpperCase();
    next();
  };
};
