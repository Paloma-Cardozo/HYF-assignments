import knex from "knex";

const dbFile = "./hyf_node_week3.db";

const knexInstance = knex({
  client: "sqlite3",
  connection: {
    filename: dbFile,
  },
});

export default knexInstance;
