
exports.up = function(knex, Promise) {
  let createQuery = `CREATE TABLE diary(
    id SERIAL PRIMARY KEY NOT NULL,
    day DATE NOT NULL
  );`

  return knex.raw(createQuery)
};

exports.down = function(knex, Promise) {
  let dropQuery = `DROP TABLE diary CASCADE`

  return knex.raw(dropQuery)
};