
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex.raw('TRUNCATE foods RESTART IDENTITY CASCADE').then(() => {
    return Promise.all([
      knex.raw(`INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?)`, ['Apple', 95, new Date]),
      knex.raw(`INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?)`, ['Chipotle burrito', 750, new Date]),
      knex.raw(`INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?)`, ['Chocolate Chip Cookie', 151, new Date]),
      knex.raw(`INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?)`, ['Grasshopper protein shake', 151, new Date]),
      knex.raw(`INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?)`, ['Bison steak', 700, new Date]),
      knex.raw(`INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?)`, ['Venison tartare', 550, new Date]),
      knex.raw(`INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?)`, ['Omelet with avacado', 850, new Date]),
      knex.raw(`INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?)`, ['Ben and Jerrys Chunky Monkey', 850, new Date]),
      knex.raw(`INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?)`, ['Mango smoothie', 700, new Date]),
      knex.raw(`INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?)`, ['Big Bobs Bouillabaisse', 550, new Date]),
      knex.raw(`INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?)`, ['Elk steak and potatoes', 850, new Date]),
      knex.raw(`INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?)`, ['Almond macarons', 400, new Date]),
      knex.raw(`INSERT INTO diary (day) VALUES (?);`, ['05/16/2017']),
      knex.raw(`INSERT INTO diary (day) VALUES (?);`, ['05/17/2017']),
      knex.raw(`INSERT INTO diary (day) VALUES (?);`, ['05/18/2017']),
      knex.raw(`INSERT INTO meals (meal, foods_id, diary_id) VALUES (?, ?, ?);`, ['breakfast', 1, 1]),
      knex.raw(`INSERT INTO meals (meal, foods_id, diary_id) VALUES (?, ?, ?);`, ['lunch', 2, 1]),
      knex.raw(`INSERT INTO meals (meal, foods_id, diary_id) VALUES (?, ?, ?);`, ['dinner', 3, 1]),
      knex.raw(`INSERT INTO meals (meal, foods_id, diary_id) VALUES (?, ?, ?);`, ['snack', 4, 1]),
      knex.raw(`INSERT INTO meals (meal, foods_id, diary_id) VALUES (?, ?, ?);`, ['breakfast', 5, 2]),
      knex.raw(`INSERT INTO meals (meal, foods_id, diary_id) VALUES (?, ?, ?);`, ['lunch', 6, 2]),
      knex.raw(`INSERT INTO meals (meal, foods_id, diary_id) VALUES (?, ?, ?);`, ['dinner', 7, 2]),
      knex.raw(`INSERT INTO meals (meal, foods_id, diary_id) VALUES (?, ?, ?);`, ['snack', 8, 2]),
      knex.raw(`INSERT INTO meals (meal, foods_id, diary_id) VALUES (?, ?, ?);`, ['breakfast', 9, 3]),
      knex.raw(`INSERT INTO meals (meal, foods_id, diary_id) VALUES (?, ?, ?);`, ['lunch', 10, 3]),
      knex.raw(`INSERT INTO meals (meal, foods_id, diary_id) VALUES (?, ?, ?);`, ['dinner', 11, 3]),
      knex.raw(`INSERT INTO meals (meal, foods_id, diary_id) VALUES (?, ?, ?);`, ['snack', 12, 3])
      ])
    });
};
