
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex.raw('TRUNCATE foods RESTART IDENTITY').then(() => {
    return Promise.all([
      knex.raw(`INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?)`, ['Apple', 95, new Date]),
      knex.raw(`INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?)`, ['Chipotle burrito', 750, new Date]),
      knex.raw(`INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?)`, ['Chocolate Chip Cookie', 151, new Date])
      ])
    });
};
