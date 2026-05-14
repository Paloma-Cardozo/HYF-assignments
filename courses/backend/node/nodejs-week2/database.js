import knex from "knex";

const dbFile = "./hyf_node_week2.db";

const knexInstance = knex({
  client: "sqlite3",
  connection: {
    filename: dbFile,
  },
});

export default knexInstance;
