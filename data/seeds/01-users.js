
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: "user1", password: "pw1", department: "finance"},
        {id: 2, username: "user2", password: "pw2", department: "engineering"},
        {id: 3, username: "user3", password: "pw3", department: "marketing"},
      ]);
    });
};
