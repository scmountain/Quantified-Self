
exports.up = function(knex, Promise) {
    let createQuery = `CREATE TABLE meals (
      id SERIAL PRIMARY KEY NOT NULL,
      meal VARCHAR NOT NULL,
      foods_id INT,
      diary_id INT,
      FOREIGN KEY (foods_id) REFERENCES foods(id),
      FOREIGN KEY (diary_id) REFERENCES diary(id)
    );`

  return knex.raw(createQuery)
};

exports.down = function(knex, Promise) {
  let dropQuery = `DROP TABLE meals CASCADE`

  return knex.raw(dropQuery)
};